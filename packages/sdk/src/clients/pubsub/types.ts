export interface Interest {
  id: string;
  topic: string;
  subscription_id: string;
  filter?: Record<string, any>;
}

export interface Subscription {
  id: string;
}

export interface Event {
  topic: string;
  payload: Record<string, any>;
}

export interface PublishEventRequest {
  type: string;
  payload: Record<string, any>;
}

export interface CreateInterestRequest {
  topic: string;
  filter?: Record<string, any>;
}

export interface UpdateInterestRequest {
  filter?: Record<string, any>;
}
