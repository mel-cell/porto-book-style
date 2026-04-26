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

export function useGithubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "mel-cell";
  const limit = parseInt(process.env.NEXT_PUBLIC_GITHUB_LIMIT || "30", 10);

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const headers: HeadersInit = {
          "Accept": "application/vnd.github.v3+json"
        };
        
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // IF token exists, we use /user/starred to get PRIVATE + PUBLIC stars.
        // IF no token, we use /users/:username/starred for PUBLIC stars only.
        const endpoint = token 
          ? `https://api.github.com/user/starred?sort=created&direction=desc&per_page=${limit}`
          : `https://api.github.com/users/${username}/starred?sort=created&direction=desc&per_page=${limit}`;

        const res = await fetch(endpoint, {
          headers,
          cache: 'no-store'
        });
        
        if (!res.ok) {
          throw new Error(`Archive link failed: ${res.status}`);
        }

        const data = (await res.json()) as Repo[];
        
        if (Array.isArray(data)) {
          setRepos(data);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Archive link interrupted";
        console.error("Failed to fetch repos:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [username, limit]);

  return { repos, loading, error };
}
