const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, options);
  const contentType = res.headers.get('content-type') || '';
  if (!res.ok) {
    const body = contentType.includes('application/json') ? await res.json() : await res.text();
    const err = new Error('API error');
    err.status = res.status;
    err.body = body;
    throw err;
  }
  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login({ email, password }) {
  return request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

export async function register(payload) {
  return request('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function getOffers() {
  return request('/api/offers');
}

export async function createOffer(data, token) {
  return request('/api/offers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
    body: JSON.stringify(data),
  });
}

export async function getOffer(id) {
  return request(`/api/offers/${id}`);
}

export async function updateOffer(id, data, token) {
  return request(`/api/offers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
    body: JSON.stringify(data),
  });
}

export async function deleteOffer(id, token) {
  return request(`/api/offers/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader(token) },
  });
}

export async function uploadDocument(file, token) {
  if (!token) {
    const err = new Error('No token provided');
    err.status = 401;
    throw err;
  }

  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`${API_URL}/api/documents/upload`, {
    method: 'POST',
    headers: { ...authHeader(token) },
    body: fd,
  });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error('Upload failed');
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return res.json();
}

export async function getDocuments(token) {
  return request('/api/documents', { headers: { ...authHeader(token) } });
}

export async function deleteDocument(id, token) {
  return request(`/api/documents/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader(token) },
  });
}

export async function getSubmissions(offerId, token) {
  if (offerId) return request(`/api/submissions/offer/${offerId}`, { headers: { ...authHeader(token) } });
  return request('/api/submissions', { headers: { ...authHeader(token) } });
}

export async function createSubmission(payload, token) {
  return request('/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
    body: JSON.stringify(payload),
  });
}

export async function deleteSubmission(id, token) {
  return request(`/api/submissions/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader(token) },
  });
}

export async function updateSubmission(id, data, token) {
  return request(`/api/submissions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
    body: JSON.stringify(data),
  });
}

export async function updateSubmissionStatus(id, data, token) {
  // convenience wrapper specifically for status updates
  return updateSubmission(id, data, token);
}

export async function getUsers(token) {
  return request('/api/users', { headers: { ...authHeader(token) } });
}

export async function getUser(id) {
  return request(`/api/users/${id}`);
}

export async function updateUser(id, data, token) {
  return request(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id, token) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader(token) },
  });
}

export async function changePassword(id, password, token) {
  return request(`/api/users/${id}/password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
    body: JSON.stringify({ password }),
  });
}

export async function getAdminStats(token) {
  return request('/api/admin/stats', { headers: { ...authHeader(token) } });
}

const client = {
  login,
  register,
  getOffers,
  createOffer,
  getOffer,
  updateOffer,
  deleteOffer,
  uploadDocument,
  getDocuments,
  deleteDocument,
  getSubmissions,
  createSubmission,
  deleteSubmission,
  updateSubmission,
  updateSubmissionStatus,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
  getAdminStats,
};

export default client;
