import { LeadRecord, LeadRepository } from '@/lib/types/repository.type';

/**
 * Lead repository implementation with structured audit logging and webhook dispatch support.
 * Designed for seamless swap with database adapters (Prisma / Drizzle / Supabase) or CRM webhooks.
 */
class MemoryLeadRepository implements LeadRepository {
  private leads: LeadRecord[] = [];

  async saveLead(leadData: Omit<LeadRecord, 'id' | 'createdAt'>): Promise<LeadRecord> {
    const newLead: LeadRecord = {
      ...leadData,
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };

    this.leads.push(newLead);

    // Structured server-side audit logging
    console.info('[LeadRepository:SaveLead]', {
      id: newLead.id,
      type: newLead.type,
      name: newLead.name,
      contact: newLead.contact,
      topicOrProject: newLead.topicOrProject,
      unitType: newLead.unitType,
      timestamp: newLead.createdAt,
      metadata: newLead.metadata,
    });

    // Webhook dispatch if configured in environment
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead),
        });
      } catch (webhookErr) {
        console.warn('[LeadRepository:WebhookDispatch:Failed]', webhookErr);
      }
    }

    return newLead;
  }

  async getAllLeads(): Promise<LeadRecord[]> {
    return [...this.leads];
  }
}

export const leadRepository: LeadRepository = new MemoryLeadRepository();
