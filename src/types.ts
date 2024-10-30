export interface ApiConfig {
  apiKey: string;
  domain: string;
}

export interface PagingResponse {
  next?: string;
}

export interface ApiResponse<T> {
  data: T[];
  paging?: PagingResponse;
}

// Contact Related Interfaces
export interface ContactCategory {
  name: string;
  consultant_id: number;
  type_id: number;
}

export interface ContactComment {
  id: number;
  consultant_id: number;
  text: string;
  important: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactCriteria {
  id: number;
  type: 'sales' | 'rental';
  suburb_ids: number[];
  property_type_ids: number[];
  property_category_ids: number[];
  beds_from?: number;
  beds_to?: number;
  baths?: number;
  rooms?: number;
  cars?: number;
  price_from?: string;
  price_to?: string;
  house_size_from?: number;
  house_size_to?: number;
  house_measure?: string;
  land_size_from?: number;
  land_size_to?: number;
  land_measure?: string;
  return_pa_from?: number;
  return_pa_to?: number;
  notes?: string;
  ealert_enabled?: boolean;
}

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  permit_email_campaign: boolean;
  permit_sms: boolean;
  ealert_enabled: boolean;
  consultant_id?: number;
  address?: ContactAddress;
  categories?: ContactCategory[];
  comments?: ContactComment[];
  criteria?: ContactCriteria[];
}

export interface ContactAddress {
  unit?: string;
  number?: string;
  street_name?: string;
  street_type?: string;
  suburb?: string;
  postcode?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

// Property Related Interfaces
export interface Property {
  unit?: string;
  number?: string;
  street_name: string;
  street_type: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  project_id?: number;
  property_type_id?: number;
  property_category_id?: number;
  property_other_category_id?: number;
  beds?: number;
  baths?: number;
  garages?: number;
  rooms?: number;
  toilets?: number;
  open_spaces?: number;
  study?: number;
  other_carspace?: string;
  cars?: number;
  lot?: number;
  powder_rooms?: number;
  rates?: string;
  level?: string;
  water_rates?: number;
  body_corporate?: string;
  land_size?: string;
  land_measure?: string;
  house_size?: string;
  house_measure?: string;
  eer?: number;
  property_styles?: string[];
  property_views?: string[];
  property_materials?: string[];
  property_features?: string[];
  tags?: string[];
}

// Listing Related Interfaces
export interface ListingImage {
  index: string;
  url: string;
}

export interface PublicFile {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface OtherLink {
  label: string;
  url: string;
}

export interface AdvertisingCopy {
  heading: string;
  text: string;
}

export interface Inspection {
  inspection_date: string;
  start_time: string;
  end_time: string;
}

// Sales Listing Interface
export interface SalesListing {
  id: number;
  office_id: number;
  status: string;
  consultant_ids: number[];
  primary_consultant_id: number;
  listing_type: string;
  project_listing: boolean;
  hidden: boolean;
  price_undisclosed: boolean;
  address_undisclosed: boolean;
  suburb_undisclosed: boolean;
  under_offer: boolean;
  website_status: string;
  description: string;
  url?: string;
  internet_hits?: string;
  auction: boolean;
  auctioneer_id?: number;
  passed_in_date?: string;
  auction_date?: string;
  auction_time?: string;
  price_from?: number;
  price_to?: number;
  display_price: string;
  situation_very_sensitive: boolean;
  source?: string;
  date_listed: string;
  campaign_start_date?: string;
  sale_date?: string;
  sale_price?: number;
  sale_status?: string;
  record_price: boolean;
  inspections?: Inspection[];
  images: ListingImage[];
  virtual_tour_url?: string;
  video_link_url?: string;
  interactive_floor_plan_url?: string;
  soi_file?: string;
  public_files?: PublicFile[];
  other_links?: OtherLink[];
  advertising_copy?: AdvertisingCopy;
  property: Property;
}

// Rental Listing Interface
export interface RentalListing {
  id: number;
  office_id: number;
  status: string;
  consultant_ids: number[];
  primary_consultant_id: number;
  rental_type: string;
  price_undisclosed: boolean;
  address_undisclosed: boolean;
  advertisable: boolean;
  url?: string;
  price_from?: number;
  price_to?: number;
  price_period?: string;
  display_price: string;
  bond?: number;
  leased_duration?: number;
  date_listed: string;
  action_date_on?: string;
  date_available?: string;
  date_leased?: string;
  date_offmarket?: string;
  date_withdrawn?: string;
  holiday_category?: string;
  availability_link?: string;
  virtual_tour_url?: string;
  video_link_url?: string;
  inspections?: Inspection[];
  images: ListingImage[];
  advertising_copy?: AdvertisingCopy;
  property: Property;
}

// Office and Consultant Interfaces
export interface Office {
  id: number;
  name: string;
  company_name: string;
  street_address: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
  fax?: string;
  email: string;
}

export interface ConsultantTestimonial {
  text: string;
  provider: string;
  date: string;
}

export interface Consultant {
  id: number;
  office_id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  phone_bh: string;
  email: string;
  profile?: string;
  profile_url?: string;
  position?: string;
  avatar_url?: string;
  staff_image_url?: string;
  teams?: string[];
  testimonials?: ConsultantTestimonial[];
  specialty_suburb_ids?: number[];
}

// Project and Property Type Interfaces
export interface Project {
  id: number;
  name: string;
}

export interface PropertyType {
  id: number;
  name: string;
}

export interface PropertyCategory {
  id: number;
  type_id: number;
  name: string;
}

export interface PropertyOtherCategory {
  id: number;
  name: string;
}

export interface Suburb {
  id: number;
  name: string;
  postcode: string;
  state?: string;
  country?: string;
}

// Lead Flow Interfaces
export interface LeadFlowLead {
  consultant_id: number;
  contact_id: number;
  property_id: number;
  listing_type?: 'sales' | 'rentals';
  temperature?: 'hot' | 'warm' | 'cold';
  subject?: string;
  task_date?: string;
  comment?: string;
}

export interface Enquiry {
  listing_id?: number;
  consultant_id?: number;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  message: string;
}
