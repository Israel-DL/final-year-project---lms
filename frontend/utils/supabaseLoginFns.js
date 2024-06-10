import supabase from "../supabase";

const createAccount = async (
  email,
  password,
  confirmPassword,
  SetIsLoading,
  setUser
) => {
  SetIsLoading(true);

  if (confirmPassword !== password) {
    alert("Passwords dont match");
    return SetIsLoading(false);
  }

  try {
    const { data, signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      console.error(signUpError);
      alert(signUpError.message);
      return SetIsLoading(false);
    }

    if (!data.user) {
      alert("User exists, try another account");
      return SetIsLoading(false);
    }

    const { updateUserError } = await supabase
      .from("users")
      .insert([{ id: data.user.id, email }])
      .select();

    if (updateUserError) {
      console.error(updateUserError);
      alert(updateUserError.message);
      return SetIsLoading(false);
    }

    setUser(data.user);
    SetIsLoading(false);
  } catch (e) {
    alert(e.message);
    SetIsLoading(false);
  }
};

const loginAccount = async (email, password, SetIsLoading, setUser) => {
  SetIsLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    console.error(error);
    return SetIsLoading(false);
  }

  if (!data.user) {
    alert("Error encountered, try again later");
    return SetIsLoading(false);
  }

  setUser(data.user);
  SetIsLoading(false);
};

const logoutAccount = async (SetIsLoading, setUser) => {
  SetIsLoading(true);
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("An error occured, try again");
    return SetIsLoading(false);
  }
  setUser(null);
  SetIsLoading(false);
};

const getCoursesBySkills = async (skill) => {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .contains("Skills", [skill]);

  if (error) {
    console.error(error);
    return [];
  }
  return courses;
};

const getCoursesByTitle = async (searchText) => {
  let { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .ilike("Title", `%${searchText}%`);

  if (error) {
    alert("An error occurred");
    console.error(error);
    return [];
  }

  return courses;
};

const getCourseById = async (id) => {
  let { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id);

  if (error) {
    alert("An error occurred");
    console.error(error);
    return {};
  }

  return courses;
};

const getUser = async () => {
  let { data, error } = await supabase.auth.getUser();

  if (error) {
    alert("Encountered an issue");
    console.error(error);
  }

  return data;
};

export {
  createAccount,
  loginAccount,
  logoutAccount,
  getCoursesBySkills,
  getCoursesByTitle,
  getCourseById,
  getUser,
};
