import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async getAnnouncements() {
    try {
      const { data, error } = await this.supabase
        .from('Announcements')
        .select('id, title, body, type, created_at');
      if (error) {
        throw error;
      }
      return data;
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  }
  async createAnnouncement(title: string, body: string, type: string) {
    try {
      const { data, error } = await this.supabase.from('Announcements').insert({
        title,
        body,
        type
      })
      if (error) {
        throw error
      }
      return data
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
