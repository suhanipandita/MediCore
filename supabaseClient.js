import { createClient } from '@supabase/supabase-js';

// --- SUPABASE INITIALIZATION ---
// This should be the correct URL and Key you configured earlier.
const supabaseUrl = 'https://bnwilfzccqbacjytuwzc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJud2lsZnpjY3FiYWNqeXR1d3pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODE1MDMsImV4cCI6MjA3Mjc1NzUwM30.BuzczkPG9Se1R2kqJlBrmCUOYhnsZOypRo43gQmGl00';

// Create and export the Supabase client instance.
export const supabase = createClient(supabaseUrl, supabaseKey);

// --- AUTHENTICATION FUNCTIONS ---

export async function signUp(email, password, fullName, role) {
    // Sign up the user in Supabase Auth, passing fullName and role as metadata.
    // The database trigger 'on_auth_user_created' will handle inserting into the 'users' table.
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: fullName,
                role: role
            }
        }
    });

    if (error) {
        console.error('Error signing up:', error.message);
    }
    
    // You no longer need the manual .insert() call here.

    return { user: data.user, error };
}

export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) console.error('Error signing in:', error.message);
    return { session: data.session, error };
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error.message);
    return { error };
}

export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

// --- DATA FETCHING FUNCTIONS ---

export async function getUserData(userId) {
    if (!userId) return { data: null, error: new Error('User ID is required.') };
    const { data, error } = await supabase
        .from('users')
        .select('full_name, role, email')
        .eq('id', userId)
        .single(); 

    if (error) console.error('Error fetching user data:', error.message);
    return { data, error };
}

export async function getAppointments() {
    const { data, error } = await supabase
        .from('appointments')
        .select(`
            id,
            start_time,
            end_time,
            status,
            patients ( users ( full_name ) ),
            doctors ( name, specialty )
        `);

    if (error) console.error('Error fetching appointments:', error.message);
    return { data, error };
}


export async function getAllPatients() {
    // This query fetches from the 'patients' table and includes all data
    // from the related 'users' table record (email, full_name, role).
    const { data, error } = await supabase
        .from('patients')
        .select('*, users(*)');

    if (error) console.error('Error fetching patients:', error.message);
    return { data, error };
}

export async function getMedicalRecords(patientId) {
    if (!patientId) return { data: null, error: new Error('Patient ID is required.') };

    const { data, error } = await supabase
        .from('medical_records')
        .select(`
            id,
            record_type,
            content,
            created_at,
            document_url,
            author:users!author_id ( full_name, role )
        `)
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false }); // Show newest records first

    if (error) console.error('Error fetching medical records:', error.message);
    return { data, error };
}

