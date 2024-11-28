import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const entriesPerPage = 1000;

  // Load all JSON data
  const allData = [];
  for (let i = 1; i <= 10; i++) {
    const filePath = path.join(process.cwd(), 'app', 'data', `webs_${i}.json`);
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    allData.push(...fileData);
  }

  const totalEntries = allData.length; // Total number of entries
  const totalPages = Math.ceil(totalEntries / entriesPerPage); // Calculate correct total pages

  // Slice the data for the current page
  const startIndex = (page - 1) * entriesPerPage;
  const endIndex = page * entriesPerPage;
  const pageData = allData.slice(startIndex, endIndex);

  return new Response(
    JSON.stringify({
      data: pageData,
      totalPages, // Send the correct total pages
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
