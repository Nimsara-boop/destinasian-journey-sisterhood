export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      event_bookings: {
        Row: {
          booked_at: string
          booking_status: string
          event_id: string
          id: string
          participants: number
          total_amount: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          booked_at?: string
          booking_status?: string
          event_id: string
          id?: string
          participants?: number
          total_amount?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          booked_at?: string
          booking_status?: string
          event_id?: string
          id?: string
          participants?: number
          total_amount?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_visits: {
        Row: {
          event_id: string
          id: string
          rating: number | null
          review: string | null
          user_id: string
          visited_at: string
        }
        Insert: {
          event_id: string
          id?: string
          rating?: number | null
          review?: string | null
          user_id: string
          visited_at?: string
        }
        Update: {
          event_id?: string
          id?: string
          rating?: number | null
          review?: string | null
          user_id?: string
          visited_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_visits_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string
          id: string
          image_url: string | null
          latitude: number | null
          location: string
          longitude: number | null
          max_participants: number | null
          price: number | null
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date: string
          id?: string
          image_url?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          max_participants?: number | null
          price?: number | null
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string
          id?: string
          image_url?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          max_participants?: number | null
          price?: number | null
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      friendships: {
        Row: {
          addressee_id: string
          created_at: string
          id: string
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          addressee_id: string
          created_at?: string
          id?: string
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          addressee_id?: string
          created_at?: string
          id?: string
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      itinerary_items: {
        Row: {
          cost: number | null
          created_at: string
          description: string | null
          end_time: string | null
          id: string
          item_type: string
          itinerary_id: string
          latitude: number | null
          location: string | null
          longitude: number | null
          notes: string | null
          order_index: number
          start_time: string
          title: string
        }
        Insert: {
          cost?: number | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          item_type: string
          itinerary_id: string
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          notes?: string | null
          order_index?: number
          start_time: string
          title: string
        }
        Update: {
          cost?: number | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          item_type?: string
          itinerary_id?: string
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          notes?: string | null
          order_index?: number
          start_time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_items_itinerary_id_fkey"
            columns: ["itinerary_id"]
            isOneToOne: false
            referencedRelation: "travel_itineraries"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          comments_count: number
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          likes_count: number
          location: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          comments_count?: number
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          likes_count?: number
          location?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          comments_count?: number
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          likes_count?: number
          location?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      tour_bookings: {
        Row: {
          booking_date: string
          booking_status: string
          created_at: string
          id: string
          participants: number
          special_requests: string | null
          total_amount: number | null
          tour_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_date: string
          booking_status?: string
          created_at?: string
          id?: string
          participants?: number
          special_requests?: string | null
          total_amount?: number | null
          tour_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          booking_status?: string
          created_at?: string
          id?: string
          participants?: number
          special_requests?: string | null
          total_amount?: number | null
          tour_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tour_packages: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          duration_days: number | null
          highlights: string[] | null
          id: string
          image_url: string | null
          included_services: string[] | null
          is_active: boolean
          location: string
          max_participants: number | null
          price: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_days?: number | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          included_services?: string[] | null
          is_active?: boolean
          location: string
          max_participants?: number | null
          price?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_days?: number | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          included_services?: string[] | null
          is_active?: boolean
          location?: string
          max_participants?: number | null
          price?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      travel_itineraries: {
        Row: {
          created_at: string
          description: string | null
          end_date: string
          id: string
          is_public: boolean
          start_date: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          is_public?: boolean
          start_date: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          is_public?: boolean
          start_date?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_locations: {
        Row: {
          accuracy: number | null
          created_at: string
          id: string
          latitude: number
          longitude: number
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          created_at?: string
          id?: string
          latitude: number
          longitude: number
          user_id: string
        }
        Update: {
          accuracy?: number | null
          created_at?: string
          id?: string
          latitude?: number
          longitude?: number
          user_id?: string
        }
        Relationships: []
      }
      user_photos: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          location: string | null
          photo_url: string
          user_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          location?: string | null
          photo_url: string
          user_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          location?: string | null
          photo_url?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
