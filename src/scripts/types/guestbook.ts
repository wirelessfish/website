export interface GuestbookEntry {
  id: number;
  name: string;
  content: string;
  site: string | null;
  date: string;
  badge: "owner" | null;

  replies: GuestbookEntry[];
}

export interface GuestbookResponse {
  entries: GuestbookEntry[];
}

export interface GuestbookPostBody {
  name: string;
  content: string;
  reply_to?: number;
  site?: string;
}
