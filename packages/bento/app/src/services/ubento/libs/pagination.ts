export type UbentoApiPage = {
  cursor?: string;
  limit?: number;
};
export type UbentoApiPagedResponse<T = unknown> = {
  data: T[];
  nextPage?: UbentoApiPage;
  previousPage?: UbentoApiPage;
};

export function ubentoToFabricPagedResponse<D>(
  response: UbentoApiPagedResponse<D>,
): { data: D[]; nextPage?: UbentoApiPage; previousPage?: UbentoApiPage } {
  return {
    data: response.data,
    nextPage: response.nextPage,
    previousPage: response.previousPage,
  };
}
