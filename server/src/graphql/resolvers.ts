import { supabase } from "../index";

export const resolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }) => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    getDish: async (_: any, { id }: { id: string }) => {
      const { data, error } = await supabase
        .from("dishes")
        .select(
          `
          *,
          location:locations(*),
          tags:dish_tags(tag:tags(*)),
          ratings(*)
        `
        )
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    getDishes: async (_: any, { filter }: { filter?: any }) => {
      let query = supabase.from("dishes").select(`
          *,
          location:locations(*),
          tags:dish_tags(tag:tags(*)),
          ratings(*)
        `);

      if (filter) {
        if (filter.search) {
          query = query.ilike("name", `%${filter.search}%`);
        }
        if (filter.location_id) {
          query = query.eq("location_id", filter.location_id);
        }
        if (filter.min_price) {
          query = query.gte("price", filter.min_price);
        }
        if (filter.max_price) {
          query = query.lte("price", filter.max_price);
        }
      }

      const { data, error } = await query;

      if (error) throw new Error(error.message);
      return data;
    },

    getLocation: async (_: any, { id }: { id: string }) => {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    getLocations: async () => {
      const { data, error } = await supabase.from("locations").select("*");

      if (error) throw new Error(error.message);
      return data;
    },

    getTags: async () => {
      const { data, error } = await supabase.from("tags").select("*");

      if (error) throw new Error(error.message);
      return data;
    },

    searchDishes: async (_: any, { query }: { query: string }) => {
      const { data, error } = await supabase
        .from("dishes")
        .select(
          `
          *,
          location:locations(*),
          tags:dish_tags(tag:tags(*)),
          ratings(*)
        `
        )
        .ilike("name", `%${query}%`);

      if (error) throw new Error(error.message);
      return data;
    },
  },

  Mutation: {
    createUser: async (_: any, { input }: { input: any }) => {
      const { data, error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
      });

      if (error) throw new Error(error.message);

      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert([
          {
            id: data.user?.id,
            email: input.email,
            username: input.username,
          },
        ])
        .select()
        .single();

      if (userError) throw new Error(userError.message);
      return userData;
    },

    updateUser: async (_: any, { id, input }: { id: string; input: any }) => {
      const { data, error } = await supabase
        .from("users")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    createDish: async (_: any, { input }: { input: any }) => {
      const { data, error } = await supabase
        .from("dishes")
        .insert([input])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    updateDish: async (_: any, { id, input }: { id: string; input: any }) => {
      const { data, error } = await supabase
        .from("dishes")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    createRating: async (_: any, { input }: { input: any }) => {
      const { data, error } = await supabase
        .from("ratings")
        .insert([input])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    updateRating: async (_: any, { id, input }: { id: string; input: any }) => {
      const { data, error } = await supabase
        .from("ratings")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    deleteRating: async (_: any, { id }: { id: string }) => {
      const { error } = await supabase.from("ratings").delete().eq("id", id);

      if (error) throw new Error(error.message);
      return true;
    },
  },
};
