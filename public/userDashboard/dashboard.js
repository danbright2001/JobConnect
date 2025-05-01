// Dashboard script to handle user authentication and display user data
import { auth, db } from '../firebase/firebaseConfig.js';
import { logout } from '../firebase/authGuard.js';
import { doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

// Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User is authenticated:", user); // Debugging line

    try {
      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const welcomeMessage = document.getElementById("welcomeMessage");
        welcomeMessage.textContent = `Welcome, ${userData.name}`;
      } else {
        console.error("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.error("User is not authenticated. Redirecting to sign-in page.");
    window.location.href = "../auth/signin.html"; // Redirect to sign-in page if not authenticated
  }
});

// Handle logout
document.getElementById("logoutButton").addEventListener("click", logout);

// Function to fetch and displaay jobs
async function displayJobs() {
  try {
    const jobsCollectionRef = collection(db, "jobs");
    const querySnapshot = await getDocs(jobsCollectionRef);
    const jobsContainer = document.getElementById("jobsContainer");
    jobsContainer.innerHTML = ""; // Clear previous jobs
    querySnapshot.forEach((doc) => {
      const job = doc.data(); // Get job data from Firestore
      // create the job card html
      const jobCard = `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold">${job.jobTitle}</h3>
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                KES ${job.jobStipend}
              </span>
            </div>
            <p class="text-gray-600 mb-4">${job.jobDescription}</p>
            <div class="flex items-center text-sm text-gray-500 mb-4">
              <i class="fas fa-clock mr-2"></i>
              <span>${new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
            <a href="../auth/signup.html" class="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Apply Now
            </a>
          </div>
        </div>
      `;

      jobsContainer.innerHTML += jobCard; // Append the job card to the container
    });
  } catch (error) {
    const jobsContainer = document.getElementById("jobsContainer");
    jobsContainer.innerHTML = "<p>Error loading jobs. Please try again later.</p>";
  }
}

displayJobs(); // Call the function to display jobs on page load
// Add event listener to the "Apply Now" button in each job car

document.addEventListener('DOMContentLoaded', function() {
            // User dropdown toggle
const userMenuButton = document.getElementById('userMenuButton');
const userDropdown = document.getElementById('userDropdown');

if (userMenuButton && userDropdown) {
    userMenuButton.addEventListener('click', function() {
        userDropdown.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!userMenuButton.contains(event.target)) {
            userDropdown.classList.add('hidden');
        }
    });
}

// You can set the username dynamically like this:
// document.getElementById('userName').textContent = 'Welcome, ' + userName;
});




