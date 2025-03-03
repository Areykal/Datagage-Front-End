import router from "@/router";
import { notify } from "./notifications";

/**
 * Auth utility functions for authentication operations
 */
export const auth = {
  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return localStorage.getItem("isAuthenticated") === "true";
  },

  /**
   * Demo login - simplified for development
   * @param {string} email User email (optional in demo mode)
   * @param {boolean} rememberMe Remember login
   */
  async demoLogin(email = "demo@datagage.com", rememberMe = false) {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Store auth token
      localStorage.setItem("isAuthenticated", "true");

      // Store demo user info
      const userData = {
        id: "user-1",
        email: email || "demo@datagage.com",
        name: "Demo User",
        role: "admin",
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Show success notification
      notify.success("Successfully logged in", {
        position: "bottom-center",
      });

      // Redirect to dashboard or requested page
      const redirectPath = router.currentRoute.value.query.redirect || "/";
      router.push(redirectPath);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message || "Login failed" };
    }
  },

  /**
   * Log in user
   * @param {string} email User email
   * @param {string} password User password
   * @param {boolean} rememberMe Remember login
   */
  async login(email, password, rememberMe = false) {
    try {
      // In a real app, this would call your API
      // Simulated authentication for demo
      if (email === "admin@datagage.com" && password === "password123") {
        localStorage.setItem("isAuthenticated", "true");

        // Store user info
        const userData = {
          id: "user-1",
          email: email,
          name: "Admin User",
          role: "admin",
        };

        localStorage.setItem("user", JSON.stringify(userData));

        notify.success("Successfully logged in");
        return { success: true, user: userData };
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      notify.error(error.message || "Login failed");
      return { success: false, error: error.message };
    }
  },

  /**
   * Log out user
   */
  logout() {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    notify.info("Successfully logged out");
    router.push("/login");
  },

  /**
   * Get current user
   */
  getUser() {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (e) {
      this.logout(); // Invalid user data, force logout
      return null;
    }
  },
};

export default auth;
