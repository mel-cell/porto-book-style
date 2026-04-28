"use client";

import { useState, useEffect } from "react";

export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

// Global cache to avoid refetching on multiple pages and duplicate instantiations
let globalReposCache: Repo[] | null = null;
let globalReposPromise: Promise<Repo[]> | null = null;

export function useGithubRepos() {
  const [repos, setRepos] = useState<Repo[]>(globalReposCache || []);
  const [loading, setLoading] = useState(!globalReposCache);
  const [error, setError] = useState<string | null>(null);

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "mel-cell";
  const limit = parseInt(process.env.NEXT_PUBLIC_GITHUB_LIMIT || "30", 10);

  useEffect(() => {
    if (globalReposCache) {
      setRepos(globalReposCache);
      setLoading(false);
      return;
    }

    async function fetchRepos() {
      if (!globalReposPromise) {
        globalReposPromise = (async () => {
          const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
          const headers: HeadersInit = {
            "Accept": "application/vnd.github.v3+json"
          };
          
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }

          const endpoint = token 
            ? `https://api.github.com/user/starred?sort=created&direction=desc&per_page=${limit}`
            : `https://api.github.com/users/${username}/starred?sort=created&direction=desc&per_page=${limit}`;

          const res = await fetch(endpoint, {
            headers,
            cache: 'force-cache'
          });
          
          if (!res.ok) {
            throw new Error(`Archive link failed: ${res.status}`);
          }

          return (await res.json()) as Repo[];
        })();
      }

      try {
        const data = await globalReposPromise;
        if (Array.isArray(data)) {
          globalReposCache = data;
          setRepos(data);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Archive link interrupted";
        console.error("Failed to fetch repos:", err);
        setError(errorMessage);
        globalReposPromise = null; // allowing retry if it failed
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [username, limit]);

  return { repos, loading, error };
}
