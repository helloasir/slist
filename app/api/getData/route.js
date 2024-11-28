import path from 'path';
import { promises as fs } from 'fs';

const PAGE_SIZE = 1000;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);

  try {
    // Determine which file to read based on the page number
    const fileIndex = Math.ceil(page / 10);
    const filePath = path.join(process.cwd(), 'app/data', `webs_${fileIndex}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Validate file content
    if (!fileContent) {
      return new Response(JSON.stringify({ error: 'File is empty' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = JSON.parse(fileContent);

    // Slice the data for pagination
    const startIndex = ((page - 1) % 10) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const pageData = data.slice(startIndex, endIndex);

    return new Response(
      JSON.stringify({
        data: pageData,
        totalPages: Math.ceil(100000 / PAGE_SIZE),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in API:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to load data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
