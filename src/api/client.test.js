import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { api } from './client.js';

let apiMock;
let axiosMock; // intercepts the bare axios.post used by the refresh flow

beforeEach(() => {
  apiMock = new MockAdapter(api);
  axiosMock = new MockAdapter(axios);
});

afterEach(() => {
  apiMock.restore();
  axiosMock.restore();
});

describe('request interceptor', () => {
  it('attaches the Bearer token from localStorage', async () => {
    localStorage.setItem('accessToken', 'tok-123');
    let seenAuth;
    apiMock.onGet('/listings').reply((config) => {
      seenAuth = config.headers.Authorization;
      return [200, { data: [] }];
    });

    await api.get('/listings');

    expect(seenAuth).toBe('Bearer tok-123');
  });

  it('sends no Authorization header when there is no token', async () => {
    let seenAuth = 'unset';
    apiMock.onGet('/listings').reply((config) => {
      seenAuth = config.headers.Authorization;
      return [200, { data: [] }];
    });

    await api.get('/listings');

    expect(seenAuth).toBeUndefined();
  });
});

describe('response interceptor — error mapping', () => {
  it('attaches uiMessage from the backend error envelope', async () => {
    apiMock.onGet('/listings').reply(500, { error: { code: 'INTERNAL', message: 'Server boom' } });

    await expect(api.get('/listings')).rejects.toMatchObject({ uiMessage: 'Server boom' });
  });
});

describe('response interceptor — 401 refresh flow', () => {
  it('refreshes the token on 401 and retries the original request', async () => {
    localStorage.setItem('accessToken', 'old-token');
    let meCalls = 0;
    apiMock.onGet('/me').reply(() => {
      meCalls += 1;
      return meCalls === 1 ? [401, { error: { message: 'expired' } }] : [200, { data: { id: 'u1' } }];
    });
    axiosMock.onPost(/\/auth\/refresh$/).reply(200, { accessToken: 'new-token' });

    const res = await api.get('/me');

    expect(res.data).toEqual({ data: { id: 'u1' } });
    expect(localStorage.getItem('accessToken')).toBe('new-token');
  });

  it('clears the token and rejects when the refresh itself fails', async () => {
    localStorage.setItem('accessToken', 'old-token');
    apiMock.onGet('/me').reply(401);
    axiosMock.onPost(/\/auth\/refresh$/).reply(401);

    await expect(api.get('/me')).rejects.toBeDefined();
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  it('shares a single refresh across concurrent 401s', async () => {
    localStorage.setItem('accessToken', 'old-token');
    let refreshCalls = 0;
    axiosMock.onPost(/\/auth\/refresh$/).reply(() => {
      refreshCalls += 1;
      return [200, { accessToken: 'new-token' }];
    });
    let aCalls = 0;
    let bCalls = 0;
    apiMock.onGet('/a').reply(() => ((aCalls += 1) === 1 ? [401] : [200, { ok: 'a' }]));
    apiMock.onGet('/b').reply(() => ((bCalls += 1) === 1 ? [401] : [200, { ok: 'b' }]));

    const [ra, rb] = await Promise.all([api.get('/a'), api.get('/b')]);

    expect(ra.data).toEqual({ ok: 'a' });
    expect(rb.data).toEqual({ ok: 'b' });
    expect(refreshCalls).toBe(1); // both 401s waited on the same refresh promise
  });
});
