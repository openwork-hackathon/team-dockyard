import { NextRequest, NextResponse } from 'next/server';
import { generateProject, type ProjectConfig } from '@/lib/templates';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ProjectConfig;

    if (!body.name || !body.template) {
      return NextResponse.json(
        { error: 'Missing required fields: name, template' },
        { status: 400 }
      );
    }

    const config: ProjectConfig = {
      name: body.name.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase(),
      description: body.description || `A ${body.template} project`,
      template: body.template,
      features: body.features || [],
      chain: body.chain || 'ethereum',
    };

    const files = generateProject(config);

    // Return files as JSON for client-side zip generation
    // In production, you'd use a library like archiver/jszip server-side
    return NextResponse.json({
      status: 'success',
      project: {
        name: config.name,
        files: files.map((f) => ({
          path: f.path,
          content: f.content,
          type: f.type,
        })),
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
