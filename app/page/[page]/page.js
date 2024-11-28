'use client';

import { use, useState, useEffect } from 'react';

export default function Page({ params }) {
  const pageParams = use(params);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const page = parseInt(pageParams.page, 10) || 1;
        setCurrentPage(page);

        const response = await fetch(`/api/getData?page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result.data || []);
        setTotalPages(result.totalPages || 0);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [pageParams]);

  return (
    <div className="container">
      <h1>Page {currentPage}</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>
  {data.map((item, index) => (
    <tr key={index}>
      <td>{item.Rank}</td>
      <td>
        <a href={`/domain/${item.Domain}`} title={`Details about ${item.Domain}`}>
          {item.Domain}
        </a>
      </td>
    </tr>
  ))}
</tbody>

      </table>
      <footer>
        <p>Page {currentPage} of {totalPages}</p>
      </footer>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 667px;
          max-width: 375px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          padding: 1rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        th, td {
          border: 1px solid #ddd;
          text-align: left;
          padding: 8px;
        }
        th {
          background-color: #f4f4f4;
        }
        footer {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
