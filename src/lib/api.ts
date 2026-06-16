const API_BASE = '/api';

// ==================== Products ====================

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProduct(id: string) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

export async function createProduct(product: any) {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(id: string, product: any) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}

export async function bulkUpdateProducts(products: any[]) {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(products),
  });
  if (!res.ok) throw new Error('Failed to update products');
  return res.json();
}

// ==================== Team ====================

export async function fetchTeam() {
  const res = await fetch(`${API_BASE}/team`);
  if (!res.ok) throw new Error('Failed to fetch team');
  return res.json();
}

export async function fetchTeamMember(id: string) {
  const res = await fetch(`${API_BASE}/team/${id}`);
  if (!res.ok) throw new Error('Team member not found');
  return res.json();
}

export async function bulkUpdateTeam(team: any[]) {
  const res = await fetch(`${API_BASE}/team`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(team),
  });
  if (!res.ok) throw new Error('Failed to update team');
  return res.json();
}

// ==================== About ====================

export async function fetchAbout() {
  const res = await fetch(`${API_BASE}/about`);
  if (!res.ok) throw new Error('Failed to fetch about');
  return res.json();
}

export async function updateAbout(about: any) {
  const res = await fetch(`${API_BASE}/about`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(about),
  });
  if (!res.ok) throw new Error('Failed to update about');
  return res.json();
}

// ==================== Content ====================

export async function fetchContent() {
  const res = await fetch(`${API_BASE}/content`);
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
}

export async function updateContent(content: any) {
  const res = await fetch(`${API_BASE}/content`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  });
  if (!res.ok) throw new Error('Failed to update content');
  return res.json();
}

// ==================== Settings ====================

export async function fetchSettings() {
  const res = await fetch(`${API_BASE}/settings`);
  if (!res.ok) throw new Error('Failed to fetch settings');
  return res.json();
}

export async function updateSettings(settings: any) {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!res.ok) throw new Error('Failed to update settings');
  return res.json();
}

// ==================== Upload ====================

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.url;
}
