# team09
1. Folder Phase1 contains our current stage project.
2. Our project contains our implemented function without back end operation. All data are from hard coding (in the share_my_craft.js).

#About files:
1. We separated the 'front-end' and  the 'back-end' development such that the server related code only occurs in the share_my_craft.js
2. For each web page, there is an HTML file, a CSS file, and a js file. The login page and sign page share the same CSS file because their appearances are similar. The share_my_script.js is share by every webpage.
3. All used images (personal profile pictures, banner pictures, the logo, craft pictures) are in the image folder.
4.We used jQuery.

#Hard-coded features
1. common user name: user, password: user
2. common user2 name: user2, password: user
3. 'user' added three crafts: Acraft1, Acraft2, Acraft3; 'user2' added 1 crafts: Bcraft1. Details can be found in the log.

#Index
1. This is the entry-point for any user.
2. If the user does not log in, the button on the top right corner would have the text 'Login'. The user can open the login page by clicking on the button. 
3. A user can click on tags of the crafts to open the corresponding craft page.
4. A user can search for crafts by crafts' titles and authors. This can be done by typing in a keyword in the search bar and click on the 'Go' button.

#Login/signup
1. If the user has an account, he/she can log in by typing the correct username and password and clicking on the login button. The user will get a red alert if he/she submit incorrect information. Once logged in, it will open the index page with a welcoming text on top-right.
2. If the common user has logged in, it will open the index page. The button on the top right corner on the index page would have a welcoming text. The user can open the personal page by clicking on the button. If the admin has logged in, it will open the admin page.
2. If the user wants to sign up for an account, he/she can click on the link at the bottom right corner of the box. It will open the signup page.
3. The user can sign up on the signup page. He/she can choose usernames that have not been taken. He/she cannot select 'admin' as the username. It will open the index page once signed up.
4. Since we did not implement the server, we can only let the hard-coded users to be logged in. So the newly signed-up users can not login currently.

#Craft
1. The craft page is an important feature of the website. A single craft page loads information about a hard-coded craft. The webpage displays the title, author, and all instructions of the craft. At the end of the instructions, there is a comment block for users to add comments. After the comment block, there is a try block for users to show their products.
2. Since we did not implement the server, the comments and tries can not be stored once the user leaves the page.
3. The user can view the personal page of the craft's author by clicking on the username below the title. The personal page showed to the viewer does not contain the setting buttons.
4. The user can also like the craft by clicking on the like button below the title. A user can only like the same craft once.

#Personal
1. The user can view the crafts he/she has tried, the crafts he/she added, the crafts he/she commented, or liked on the personal page by clicking buttons on the sidebar.
2. The user can add a new craft on the personal page. However, the craft would disappear once leave the page because the server was not implemented.
3. The user can change its profile picture, banner picture, and password on the personal page. However, these changed settings will disappear once they leave the page because the server was not implemented.

#Admin
1. The admin can delete common users or crafts in the admin page. The admin does not have its personal picture or banner picture. Our website has only one admin.
2. Later on when we learned the server we my add more feature to the admin.