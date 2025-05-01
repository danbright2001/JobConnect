import { db } from "../firebase/firebaseConfig.js";
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

// Function to fetch and display the total number of users
async function displayTotalUsers() {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    // Count the total number of users
    const totalUsers = querySnapshot.size;

    // Display the total number of users in the DOM
    const totalUsersElement = document.getElementById("totalUsers");
    totalUsersElement.textContent = `Total Users: ${totalUsers}`;
  } catch (error) {
    console.error("Error fetching total users:", error);
    const totalUsersElement = document.getElementById("totalUsers");
    totalUsersElement.textContent = "Error loading total users.";
  }
}

// Function to fetch and display the total number of jobs
async function displayTotalJobs() {
  try {
    const jobsCollectionRef = collection(db, "jobs");
    const querySnapshot = await getDocs(jobsCollectionRef);

    // Count the total number of jobs
    const totalJobs = querySnapshot.size;

    // Display the total number of jobs in the DOM
    const totalJobsElement = document.getElementById("totalJobs");
    totalJobsElement.textContent = `Total Jobs: ${totalJobs}`;
  } catch (error) {
    console.error("Error fetching total jobs:", error);
    const totalJobsElement = document.getElementById("totalJobs");
    totalJobsElement.textContent = "Error loading total jobs.";
  }
}

// Call the functions to display the total number of users and jobs
displayTotalUsers();
displayTotalJobs();

// Existing job posting functionality
const jobForm = document.getElementById("jobForm");
jobForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const jobTitle = document.getElementById("jobTitle").value;
  const jobDescription = document.getElementById("jobDescription").value;
  const jobStipend = document.getElementById("jobStipend").value;

  console.log({ jobTitle, jobDescription, jobStipend }); // Debugging

  try {
    const docRef = await addDoc(collection(db, "jobs"), {
      jobTitle,
      jobDescription,
      jobStipend,
      createdAt: new Date().toISOString(),
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Job posted successfully!");
    jobForm.reset();

    // Update the total jobs count after adding a new job
    displayTotalJobs();
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error posting job: " + error.message);
  }
});


async function displayAllUsers() {
  try {
    const userCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(userCollectionRef);
    const usersContainer = document.getElementById("usersContainer");
    usersContainer.innerHTML = ""; // Clear previous users

    querySnapshot.forEach((doc) => {
      const user = doc.data(); // Get user data from Firestore
      // create the user card html
      const userCard = `

        <div class="bg-white rounded-lg shadow-md  hover:shadow-xl transition p-4 mb-4">
          <div class="">${user.email}</div>
          <div class="">${user.name}</div>
        </div>
        
      `;
      usersContainer.innerHTML += userCard; // Append the user card to the container
    });
  } catch (error) {
    const usersContainer = document.getElementById("usersContainer");
    usersContainer.innerHTML = "<p>Error loading users. Please try again later.</p>";
    console.error("Error fetching users:", error);
  }
}

displayAllUsers();


document.addEventListener('DOMContentLoaded', function() {
  // Toggle sidebar on mobile
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', function() {
          sidebar.classList.toggle('-translate-x-full');
          sidebar.classList.toggle('translate-x-0');
      });
  }
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickOnToggle = event.target === sidebarToggle || sidebarToggle.contains(event.target);
      
      if (!isClickInsideSidebar && !isClickOnToggle && window.innerWidth < 768) {
          sidebar.classList.add('-translate-x-full');
          sidebar.classList.remove('translate-x-0');
      }
  });
  
  // Prevent closing when clicking inside sidebar
  sidebar.addEventListener('click', function(event) {
      event.stopPropagation();
  });

  // Toggle job form
  const addJobsBtn = document.getElementById('addJobsBtn');
  const jobFormContainer = document.getElementById('jobFormContainer');
  const closeJobForm = document.getElementById('closeJobForm');

  if (addJobsBtn && jobFormContainer) {
      addJobsBtn.addEventListener('click', function() {
          jobFormContainer.classList.toggle('hidden');
          jobFormContainer.classList.toggle('flex');
      });
  }

  if (closeJobForm && jobFormContainer) {
      closeJobForm.addEventListener('click', function() {
          jobFormContainer.classList.add('hidden');
          jobFormContainer.classList.remove('flex');
      });
  }
});
