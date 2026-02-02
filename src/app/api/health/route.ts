import { NextResponse } from 'next/server';

const startTime = Date.now();

export async function GET() {
  const uptimeMs = Date.now() - startTime;
  const hours = Math.floor(uptimeMs / 3600000);
  const minutes = Math.floor((uptimeMs % 3600000) / 60000);

  return NextResponse.json({
    status: 'ok',
    version: '0.1.0',
    uptime: `${hours}h ${minutes}m`,
    timestamp: new Date().toISOString(),
  });
}
