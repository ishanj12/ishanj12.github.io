function switchTab(groupOrTab, tabName) {
  // Backward compatible: if only one arg, treat as legacy single-group mode
  if (tabName === undefined) {
    tabName = groupOrTab;
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Deactivate all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected tab content
    const selectedContent = document.getElementById(tabName);
    if (selectedContent) {
      selectedContent.classList.add('active');
    }

    // Activate selected tab
    const selectedTab = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    if (selectedTab) {
      selectedTab.classList.add('active');
    }
    return;
  }

  // Multi-group mode: only affect tabs/content within the same group
  var group = groupOrTab;

  // Deactivate all tabs in this group
  var groupTabs = document.querySelectorAll('.tab[data-group="' + group + '"]');
  groupTabs.forEach(function(tab) { tab.classList.remove('active'); });

  // Hide all tab-content in this group
  var groupContents = document.querySelectorAll('.tab-content[data-group="' + group + '"]');
  groupContents.forEach(function(content) { content.classList.remove('active'); });

  // Show selected tab content
  var selectedContent = document.getElementById(tabName);
  if (selectedContent) {
    selectedContent.classList.add('active');
  }

  // Activate the clicked tab button
  var selectedTab = document.querySelector('.tab[data-group="' + group + '"][data-tab="' + tabName + '"]');
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
}

// Initialize first tab as active on load
document.addEventListener('DOMContentLoaded', function() {
  // Legacy mode: activate first tab if no data-group tabs exist
  var groupedTabs = document.querySelectorAll('.tabs[data-group]');
  if (groupedTabs.length === 0) {
    var firstTab = document.querySelector('.tab');
    if (firstTab) {
      firstTab.click();
    }
  } else {
    // Multi-group mode: activate first tab in each group
    var seen = {};
    groupedTabs.forEach(function(container) {
      var group = container.getAttribute('data-group');
      if (!seen[group]) {
        seen[group] = true;
        var firstTab = container.querySelector('.tab');
        if (firstTab) {
          firstTab.click();
        }
      }
    });
  }

  var menuBtn = document.querySelector('.mobile-menu-btn');
  var navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
      });
    });
  }
});
