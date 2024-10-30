import {
  ApiConfig,
  ApiResponse,
  Contact,
  SalesListing,
  RentalListing,
  Office,
  Consultant,
  Project,
  PropertyType,
  PropertyCategory,
  PropertyOtherCategory,
  Suburb,
  LeadFlowLead,
  Enquiry,
  ContactCategory,
  ContactComment,
  ContactCriteria,
} from './types';
import { AuthenticationError, BoxDiceError, RateLimitError } from './errors';

export class BoxDiceClient {
  private readonly baseUrl: string;
  private readonly headers: Headers;

  constructor(private readonly config: ApiConfig) {
    this.baseUrl = `https://${config.domain}/website_api`;
    this.headers = new Headers({
      'Authorization': `Api-Key token=${config.apiKey}`,
      'Content-Type': 'application/json',
    });
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const response = await fetch(url, {
      headers: this.headers,
      ...options,
    });

    if (response.status === 401) {
      throw new AuthenticationError();
    }

    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get('Retry-After') || '60', 10);
      throw new RateLimitError(retryAfter);
    }

    if (!response.ok) {
      throw new BoxDiceError(`API request failed: ${response.statusText}`, response.status);
    }

    return response.json();
  }

  private async getPaginated<T>(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    const queryParams = new URLSearchParams(params);
    return this.request<ApiResponse<T>>(`${endpoint}?${queryParams}`);
  }

  // Contacts
  async getContacts(ignoreEalertEnabled?: boolean, after?: string): Promise<ApiResponse<Contact>> {
    const params: Record<string, string> = {};
    if (ignoreEalertEnabled) params.ignore_ealert_enabled = 'true';
    if (after) params.after = after;
    return this.getPaginated<Contact>('contacts', params);
  }

  async createContact(contact: Partial<Contact>): Promise<{ id: number }> {
    return this.request<{ id: number }>('contacts', {
      method: 'POST',
      body: JSON.stringify({ contact }),
    });
  }

  async updateContact(id: number, contact: Partial<Contact>): Promise<void> {
    await this.request(`contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ contact }),
    });
  }

  // Contact Categories
  async assignContactCategories(contactId: number, categories: ContactCategory[]): Promise<void> {
    await this.request(`contacts/${contactId}/categories`, {
      method: 'POST',
      body: JSON.stringify({ categories }),
    });
  }

  async removeContactCategories(contactId: number, categories: ContactCategory[]): Promise<void> {
    await this.request(`contacts/${contactId}/categories`, {
      method: 'DELETE',
      body: JSON.stringify({ categories }),
    });
  }

  // Contact Notes
  async createContactNote(contactId: number, note: Partial<ContactComment>): Promise<{ id: number }> {
    return this.request<{ id: number }>(`contacts/${contactId}/notes`, {
      method: 'POST',
      body: JSON.stringify({ note }),
    });
  }

  // Search Criteria
  async createSearchCriteria(contactId: number, criteria: Partial<ContactCriteria>): Promise<{ id: number }> {
    return this.request<{ id: number }>(`contacts/${contactId}/criteria`, {
      method: 'POST',
      body: JSON.stringify({ criteria }),
    });
  }

  async updateSearchCriteria(contactId: number, criteriaId: number, criteria: Partial<ContactCriteria>): Promise<void> {
    await this.request(`contacts/${contactId}/criteria/${criteriaId}`, {
      method: 'PATCH',
      body: JSON.stringify({ criteria }),
    });
  }

  async deleteSearchCriteria(contactId: number, criteriaId: number): Promise<void> {
    await this.request(`contacts/${contactId}/criteria/${criteriaId}`, {
      method: 'DELETE',
    });
  }

  // Sales Listings
  async getSalesListings(officeId?: number, after?: string): Promise<ApiResponse<SalesListing>> {
    const params: Record<string, string> = {};
    if (officeId) params.office_id = officeId.toString();
    if (after) params.after = after;
    return this.getPaginated<SalesListing>('sales_listings', params);
  }

  async updateSalesListing(id: number, data: { url?: string; internet_hits?: string }): Promise<void> {
    await this.request(`sales_listings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ sales_listing: data }),
    });
  }

  // Rental Listings
  async getRentalListings(officeId?: number, after?: string): Promise<ApiResponse<RentalListing>> {
    const params: Record<string, string> = {};
    if (officeId) params.office_id = officeId.toString();
    if (after) params.after = after;
    return this.getPaginated<RentalListing>('rental_listings', params);
  }

  async updateRentalListing(id: number, data: { url: string }): Promise<void> {
    await this.request(`rental_listings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ rental_listing: data }),
    });
  }

  // Offices
  async getOffices(after?: string): Promise<ApiResponse<Office>> {
    return this.getPaginated<Office>('offices', after ? { after } : {});
  }

  // Consultants
  async getConsultants(after?: string): Promise<ApiResponse<Consultant>> {
    return this.getPaginated<Consultant>('consultants', after ? { after } : {});
  }

  // Projects
  async getProjects(officeId?: number, after?: string): Promise<ApiResponse<Project>> {
    const params: Record<string, string> = {};
    if (officeId) params.office_id = officeId.toString();
    if (after) params.after = after;
    return this.getPaginated<Project>('projects', params);
  }

  // Property Types and Categories
  async getPropertyTypes(after?: string): Promise<ApiResponse<PropertyType>> {
    return this.getPaginated<PropertyType>('property_types', after ? { after } : {});
  }

  async getPropertyCategories(after?: string): Promise<ApiResponse<PropertyCategory>> {
    return this.getPaginated<PropertyCategory>('property_categories', after ? { after } : {});
  }

  async getPropertyOtherCategories(after?: string): Promise<ApiResponse<PropertyOtherCategory>> {
    return this.getPaginated<PropertyOtherCategory>('property_other_categories', after ? { after } : {});
  }

  // Suburbs
  async getSuburbs(after?: string): Promise<ApiResponse<Suburb>> {
    return this.getPaginated<Suburb>('suburbs', after ? { after } : {});
  }

  // Lead Flow
  async createLeadFlowLead(lead: LeadFlowLead): Promise<{ id: number }> {
    return this.request<{ id: number }>('appraisal_leads', {
      method: 'POST',
      body: JSON.stringify({ appraisal_lead: lead }),
    });
  }

  // Enquiries
  async createEnquiry(enquiry: Enquiry): Promise<void> {
    await this.request('enquiries', {
      method: 'POST',
      body: JSON.stringify({ enquiry }),
    });
  }
}
