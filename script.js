// 🔥 GET CATEGORY FROM URL
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category") || "all";
}
        

console.log("JS Working ✅");


// Call the function
document.getElementById("navbarToggle").addEventListener("click", function() {
    document.getElementById("navbarNav").classList.toggle("active");
});


fetchTodos();



//Make navbar work
