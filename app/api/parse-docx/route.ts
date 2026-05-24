import { NextResponse } from 'next/server';
import path from 'path';
import mammoth from 'mammoth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('file');

  if (!fileUrl) {
    return NextResponse.json({ error: 'No file specified' }, { status: 400 });
  }

  // Prevent directory traversal
  const fileName = path.basename(fileUrl);
  const filePath = path.join(process.cwd(), 'public', 'docs', fileName);

  try {
    const result = await mammoth.convertToHtml({ path: filePath });
    return NextResponse.json({ html: result.value });
  } catch (error) {
    console.error('Error parsing docx:', error);
    return NextResponse.json({ error: 'Failed to parse docx' }, { status: 500 });
  }
}
