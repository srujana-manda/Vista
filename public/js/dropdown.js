
    const categoryInput = document.getElementById('categoryInput');
    const form = document.querySelector('form');
  
    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const selectedCategory = this.textContent.trim();
        categoryInput.value = selectedCategory;
  
        // Update the dropdown button text
        document.querySelector('.dropdown-toggle').textContent = selectedCategory;
      });
    });
  
    // Prevent form submission if category is not selected
    form.addEventListener('submit', function (e) {
      if (!categoryInput.value.trim()) {
        e.preventDefault();
        alert("Please select a category.");
      }
    });

  


