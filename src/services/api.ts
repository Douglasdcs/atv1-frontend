// src/services/api.ts
import type { TrabalhoRelacionado } from '../entities/TrabalhoRelacionado'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function handle<T>(resp: Response): Promise<T> {
  if (!resp.ok) {
    const msg = await resp.text().catch(() => '')
    throw new Error(`HTTP ${resp.status} - ${msg || resp.statusText}`)
  }
  return resp.json() as Promise<T>
}

export async function fetchTrabalhos(): Promise<TrabalhoRelacionado[]> {
  const resp = await fetch(`${BASE_URL}/api/trabalhos`)
  return handle<TrabalhoRelacionado[]>(resp)
}

export async function fetchTrabalhosById(id: number): Promise<TrabalhoRelacionado> {
  const resp = await fetch(`${BASE_URL}/api/trabalhos${id}`)
  return handle<TrabalhoRelacionado>(resp)
}