const openSidebarButton = document.querySelector("#open-sidebar-button");

function showSidebar(){
    const sidebar = document.querySelector('#sidebar');
    sidebar.classList.remove('collapsed');
    openSidebarButton.classList.add('hidden');
}

const closeSidebarButton = document.querySelector("#close-sidebar-button");

function hideSidebar(){
    const sidebar = document.querySelector('#sidebar');
    sidebar.classList.add('collapsed');
    setTimeout("openSidebarButton.classList.remove('hidden')", 230);
}

openSidebarButton.addEventListener('click', showSidebar);
closeSidebarButton.addEventListener('click', hideSidebar);