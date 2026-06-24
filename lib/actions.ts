'use server';

import { githubTools } from './tools';
import { recordAuditEvent } from './agent/audit';
import { assertApprovedToolExecutionAllowed } from './agent/permissions';

/**
 * Server Action to execute a tool that required user approval.
 * This ensures the execution happens on the server with access to environment variables.
 */
export async function executeApprovedTool(toolName: string, args: any) {
  const decision = assertApprovedToolExecutionAllowed(toolName);

  recordAuditEvent({
    toolName,
    status: 'approved',
    requiresApproval: decision.requiresApproval,
    risk: decision.risk,
    input: args,
  });

  console.log(`Executing approved tool: ${toolName}`);

  // Find the tool in the consolidated tools object
  const tool = (githubTools as any)[toolName];

  if (!tool) {
    recordAuditEvent({
      toolName,
      status: 'failed',
      requiresApproval: decision.requiresApproval,
      risk: decision.risk,
      input: args,
      error: `Narzędzie ${toolName} nie zostało znalezione.`,
    });

    throw new Error(`Narzędzie ${toolName} nie zostało znalezione.`);
  }

  if (!tool.execute) {
    recordAuditEvent({
      toolName,
      status: 'failed',
      requiresApproval: decision.requiresApproval,
      risk: decision.risk,
      input: args,
      error: `Narzędzie ${toolName} nie posiada funkcji wykonawczej na serwerze.`,
    });

    throw new Error(`Narzędzie ${toolName} nie posiada funkcji wykonawczej na serwerze.`);
  }

  try {
    const result = await tool.execute(args);

    recordAuditEvent({
      toolName,
      status: 'succeeded',
      requiresApproval: decision.requiresApproval,
      risk: decision.risk,
      input: args,
      output: result,
    });

    return result;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Wystąpił błąd podczas wykonywania narzędzia.';

    recordAuditEvent({
      toolName,
      status: 'failed',
      requiresApproval: decision.requiresApproval,
      risk: decision.risk,
      input: args,
      error: message,
    });

    console.error(`Error executing tool ${toolName}:`, error);
    throw new Error(message);
  }
}
