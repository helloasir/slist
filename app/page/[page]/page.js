'use client'; // Mark this as a Client Component

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Constants
const PAGE_SIZE = 1000;

export default function Page({ params }) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Resolve `params` before accessing `params.page`
  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      const page = parseInt(resolvedParams.page, 10) || 1;
      setCurrentPage(page);

      // Fetch paginated data
      const response = await fetch(`/api/getData?page=${page}`);
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.totalPages);
    })();
  }, [params]);

  return (
    <div className="container">
      <header>
        <h1>SEO Optimized Domains - Page {currentPage}</h1>
      </header>

      <main>
        <section>
          <h2>Featured Domains</h2>
          <ul>
            {data.map((item) => (
              <li key={item.Rank}>
                <Link href={`/domain/${item.Domain}`}>
                  {item.Rank}. {item.Domain}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Pagination */}
        <div className="pagination">
          {currentPage > 1 && (
            <Link href={`/page/${currentPage - 1}`}>Previous</Link>
          )}
          <span>
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link href={`/page/${currentPage + 1}`}>Next</Link>
          )}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 My App. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Arial, sans-serif;
        }
        header {
          background-color: #0070f3;
          color: white;
          width: 40%;
          text-align: center;
          padding: 1rem;
        }
        h1 {
          font-size: 1.5rem;
        }
        main {
          padding: 1rem;
          width: 40%;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 0.5rem 0;
        }
        a {
          text-decoration: none;
          color: #0070f3;
        }
        a:hover {
          text-decoration: underline;
        }
        .pagination {
          display: flex;
          justify-content: space-between;
          width: 40%;
          margin-top: 1rem;
        }
        footer {
          background-color: #f5f5f5;
          width: 40%;
          text-align: center;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
