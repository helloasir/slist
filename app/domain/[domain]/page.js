import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params }) {
  const { domain } = params;

  const allData = [];
  for (let i = 1; i <= 10; i++) {
    const filePath = path.join(process.cwd(), 'app/data', `webs_${i}.json`);
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    allData.push(...fileData);
  }

  const domainData = allData.find(item => item.Domain === domain);

  if (!domainData) {
    return {
      title: 'Domain Not Found',
      description: `The domain ${domain} could not be found.`,
    };
  }

  return {
    title: `Details about ${domainData.Domain}`,
    description: `Rank: ${domainData.Rank}. Details include ${domainData['Detail 1']}, ${domainData['Detail 2']}, and more.`,
  };
}

export default async function DomainPage({ params }) {
  const { domain } = params;

  const allData = [];
  for (let i = 1; i <= 10; i++) {
    const filePath = path.join(process.cwd(), 'app/data', `webs_${i}.json`);
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    allData.push(...fileData);
  }

  const domainData = allData.find(item => item.Domain === domain);

  if (!domainData) {
    return <div>Domain not found.</div>;
  }

  return (
    <div className="container">
      <header>
        <h1>Domain Details: {domainData.Domain}</h1>
      </header>

      <main>
        <ul>
          <li>Rank: {domainData.Rank}</li>
          <li>Detail 1: {domainData['Detail 1']}</li>
          <li>Detail 2: {domainData['Detail 2']}</li>
          <li>Detail 3: {domainData['Detail 3']}</li>
          <li>Detail 4: {domainData['Detail 4']}</li>
          <li>Detail 5: {domainData['Detail 5']}</li>
        </ul>
      </main>

      <style jsx>{`
        .container {
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        header {
          background-color: #0070f3;
          color: white;
          padding: 1rem;
          width: 100%;
          text-align: center;
        }
        main {
          margin: 20px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
}
