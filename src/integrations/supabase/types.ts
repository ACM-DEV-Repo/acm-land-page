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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_published_analysis: {
        Row: {
          analysis_content: string
          id: string
          model: string
          prompt_used: string
          provider: string
          published_at: string | null
          published_by: string | null
          question_key: string | null
          status: string
          target: string
          total_responses: string
        }
        Insert: {
          analysis_content: string
          id?: string
          model: string
          prompt_used: string
          provider: string
          published_at?: string | null
          published_by?: string | null
          question_key?: string | null
          status?: string
          target: string
          total_responses?: string
        }
        Update: {
          analysis_content?: string
          id?: string
          model?: string
          prompt_used?: string
          provider?: string
          published_at?: string | null
          published_by?: string | null
          question_key?: string | null
          status?: string
          target?: string
          total_responses?: string
        }
        Relationships: []
      }
      ai_settings: {
        Row: {
          custom_prompt: string | null
          id: string
          openai_api_key: string | null
          openai_model: string | null
          prompt_conclusion: string | null
          prompt_hygiene: string | null
          prompt_q24: string | null
          prompt_q30: string | null
          prompt_q9: string | null
          provider: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          custom_prompt?: string | null
          id?: string
          openai_api_key?: string | null
          openai_model?: string | null
          prompt_conclusion?: string | null
          prompt_hygiene?: string | null
          prompt_q24?: string | null
          prompt_q30?: string | null
          prompt_q9?: string | null
          provider?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          custom_prompt?: string | null
          id?: string
          openai_api_key?: string | null
          openai_model?: string | null
          prompt_conclusion?: string | null
          prompt_hygiene?: string | null
          prompt_q24?: string | null
          prompt_q30?: string | null
          prompt_q9?: string | null
          provider?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      hygiene_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          role: string
          sql_executed: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          role: string
          sql_executed?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          role?: string
          sql_executed?: string | null
        }
        Relationships: []
      }
      hygiene_staged_changes: {
        Row: {
          affected_count: string
          applied_at: string | null
          applied_by: string | null
          created_at: string | null
          id: string
          new_value: string
          original_value: string
          status: string
          target_column: string
          target_table: string
        }
        Insert: {
          affected_count: string
          applied_at?: string | null
          applied_by?: string | null
          created_at?: string | null
          id?: string
          new_value: string
          original_value: string
          status?: string
          target_column: string
          target_table?: string
        }
        Update: {
          affected_count?: string
          applied_at?: string | null
          applied_by?: string | null
          created_at?: string | null
          id?: string
          new_value?: string
          original_value?: string
          status?: string
          target_column?: string
          target_table?: string
        }
        Relationships: []
      }
      survey_responses: {
        Row: {
          afastamento: string[] | null
          atividades_participacao: string[] | null
          beneficio_valor_real: string | null
          beneficios_pagar: string[] | null
          canais_consumo: string[] | null
          canal_comunicacao: string | null
          capacitacoes_ia: string[] | null
          cidade: string | null
          created_at: string
          crescimento: string | null
          email: string | null
          faixa_etaria: string | null
          falta_comunidade: string | null
          fase: string | null
          formato_aprendizado: string | null
          id: string
          id_crm: string | null
          inspiracao: string | null
          instituicao: string | null
          mensagem_presidencia: string | null
          motivacao: string | null
          nome: string | null
          outra_atividade: string | null
          outra_capacitacao: string | null
          outra_preocupacao: string | null
          outra_regiao: string | null
          outra_visao_carreira: string | null
          outro_afastamento: string | null
          outro_beneficio: string | null
          outro_canal: string | null
          outro_canal_comunicacao: string | null
          outro_criador: string | null
          outro_papel_tecnologia: string | null
          outro_pertencimento: string | null
          outro_reconhecimento: string | null
          outro_valor: string | null
          papel_tecnologia: string[] | null
          perfil: string | null
          perfis_acompanha: string | null
          pertencimento: string[] | null
          preocupacoes: string[] | null
          probabilidade_participacao: string | null
          reconhecimento: string[] | null
          regiao: string | null
          representacao: string | null
          respondido: string | null
          sexo: string | null
          telefone: string | null
          tipo_criador: string | null
          uf: string | null
          updated_at: string
          usaria_ia: string | null
          valor_mensal: string | null
          valores_associacao: string[] | null
          visao_carreira: string | null
        }
        Insert: {
          afastamento?: string[] | null
          atividades_participacao?: string[] | null
          beneficio_valor_real?: string | null
          beneficios_pagar?: string[] | null
          canais_consumo?: string[] | null
          canal_comunicacao?: string | null
          capacitacoes_ia?: string[] | null
          cidade?: string | null
          created_at?: string
          crescimento?: string | null
          email?: string | null
          faixa_etaria?: string | null
          falta_comunidade?: string | null
          fase?: string | null
          formato_aprendizado?: string | null
          id?: string
          id_crm?: string | null
          inspiracao?: string | null
          instituicao?: string | null
          mensagem_presidencia?: string | null
          motivacao?: string | null
          nome?: string | null
          outra_atividade?: string | null
          outra_capacitacao?: string | null
          outra_preocupacao?: string | null
          outra_regiao?: string | null
          outra_visao_carreira?: string | null
          outro_afastamento?: string | null
          outro_beneficio?: string | null
          outro_canal?: string | null
          outro_canal_comunicacao?: string | null
          outro_criador?: string | null
          outro_papel_tecnologia?: string | null
          outro_pertencimento?: string | null
          outro_reconhecimento?: string | null
          outro_valor?: string | null
          papel_tecnologia?: string[] | null
          perfil?: string | null
          perfis_acompanha?: string | null
          pertencimento?: string[] | null
          preocupacoes?: string[] | null
          probabilidade_participacao?: string | null
          reconhecimento?: string[] | null
          regiao?: string | null
          representacao?: string | null
          respondido?: string | null
          sexo?: string | null
          telefone?: string | null
          tipo_criador?: string | null
          uf?: string | null
          updated_at?: string
          usaria_ia?: string | null
          valor_mensal?: string | null
          valores_associacao?: string[] | null
          visao_carreira?: string | null
        }
        Update: {
          afastamento?: string[] | null
          atividades_participacao?: string[] | null
          beneficio_valor_real?: string | null
          beneficios_pagar?: string[] | null
          canais_consumo?: string[] | null
          canal_comunicacao?: string | null
          capacitacoes_ia?: string[] | null
          cidade?: string | null
          created_at?: string
          crescimento?: string | null
          email?: string | null
          faixa_etaria?: string | null
          falta_comunidade?: string | null
          fase?: string | null
          formato_aprendizado?: string | null
          id?: string
          id_crm?: string | null
          inspiracao?: string | null
          instituicao?: string | null
          mensagem_presidencia?: string | null
          motivacao?: string | null
          nome?: string | null
          outra_atividade?: string | null
          outra_capacitacao?: string | null
          outra_preocupacao?: string | null
          outra_regiao?: string | null
          outra_visao_carreira?: string | null
          outro_afastamento?: string | null
          outro_beneficio?: string | null
          outro_canal?: string | null
          outro_canal_comunicacao?: string | null
          outro_criador?: string | null
          outro_papel_tecnologia?: string | null
          outro_pertencimento?: string | null
          outro_reconhecimento?: string | null
          outro_valor?: string | null
          papel_tecnologia?: string[] | null
          perfil?: string | null
          perfis_acompanha?: string | null
          pertencimento?: string[] | null
          preocupacoes?: string[] | null
          probabilidade_participacao?: string | null
          reconhecimento?: string[] | null
          regiao?: string | null
          representacao?: string | null
          respondido?: string | null
          sexo?: string | null
          telefone?: string | null
          tipo_criador?: string | null
          uf?: string | null
          updated_at?: string
          usaria_ia?: string | null
          valor_mensal?: string | null
          valores_associacao?: string[] | null
          visao_carreira?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: { Args: { _user_id: string }; Returns: string }
      get_users_with_email: {
        Args: never
        Returns: {
          created_at: string
          email: string
          id: string
          role: string
          user_id: string
        }[]
      }
      has_role: { Args: { _role: string; _user_id: string }; Returns: boolean }
      update_survey_contact: {
        Args: { _email: string; _id: string; _nome: string; _telefone: string }
        Returns: undefined
      }
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
