//listen for form submit
document.querySelector('.form').addEventListener('submit', addBookmark);
document.querySelector('body').addEventListener('load', fetchBookmarks());

function addBookmark(e){
    e.preventDefault();
    let siteName = document.getElementById('name').value;
    let siteUrl = document.getElementById('url').value;
    
    let bookMark = {
        name: siteName,
        url: siteUrl
    }
    
    // //localeStorage test(how to use locale storage)
    // localStorage.setItem('test', 'Hello World'); [test is the key, hellow world is the value]
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));
    //JSON.parse will turn a string back to json[used well with locle storage get item]
    //json.stringify will turn a json to string[used with locale storage set item]

    if(localStorage.getItem('bookmarks') === null){
        let bookmarks = [];
        //Add to Array
        bookmarks.push(bookMark);
        //ls only takes string, so we need to convert the json array element to string first
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        //get bookmarks from localestorage
       let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // Check if bookmark already exists
        const existingBookmark = bookmarks.find(b => b.name === siteName || b.url === siteUrl);
        if (existingBookmark) {
            // Do not add the bookmark if it already exists
            alert(`${siteName} already bookmarked, cannot add duplicate entries`);
            return;
        }
       
       // add bookMark to array
       bookmarks.push(bookMark);
       //set back to localeStorage
       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear form
    document.querySelector('.form').reset();

    //Re-fetch Bookmark
    fetchBookmarks();
}
//delete bookmark
function deleteBookmark(url){
    //get bookmarks from localeStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks 
    bookmarks.forEach((bookmark, index)=>{

        if (bookmark.url === url) {
            const confirmation = confirm(`Confirm removal of the site entry "${bookmark.name}"`);
    
            if (confirmation) {
                bookmarks.splice(index, 1); //splice from bookmarks array
            } else {
                // User clicked "Cancel," do nothing
                return;
            }
        }
    });
    //reset locale storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks. So item clears as bookmark is fetched since it's been spliced from bookmarks
    fetchBookmarks();
}
//fetch bookmarks
function fetchBookmarks(){
     //get bookmarks from localestorage
     let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
     //get output id
     let bookmarksResult = document.querySelector('.sites');
     //Build Output
     bookmarksResult.innerHTML = '';
     //looping through each bookmark
     bookmarks.forEach((bookmark)=>{
         let name = bookmark.name;
         let url = bookmark.url;

         bookmarksResult.innerHTML += `
         <div class="site">
            <p class="site-title">${name}</p>
            <div class="site-buttons">
                <a class="site-btn visit" target="_blank" href="${url}">Visit</a>
                <a onclick="deleteBookmark('${url}')" class="site-btn delete" href="#">Delete</a>
            </div>
         </div> `;
     })

}