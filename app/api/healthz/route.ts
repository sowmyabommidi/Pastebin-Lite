import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Add any health checks here (database connection, etc.)
    return NextResponse.json(
      { 
        status: 'ok',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}