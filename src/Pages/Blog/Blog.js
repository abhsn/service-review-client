import styles from "./Blog.module.css";

function Blog() {
	return (
		<section className={styles.blogsContainer}>
			<h3 className={styles.blogsTitle}>Blog</h3>

			{/* first article */}
			<article className={styles.blogContainer}>
				<h3>Differences between SQL and NoSQL</h3>
				<p>SQL, which stands for 'Structured Query Languege' is the programming language that's been widely used in RDBMS since the 1970s. In the early years, when storage was expenive, SQL databases focused on reducing data duplication. SQL is used for querying relational database where data is stored in rows and table that are linked in various ways. One table record may link to one other or to many others, or many table records may be related to many records in another table. These rational databases, which offer fast data storage and recovery, can handle great amounts of data and complex SQL queries.</p>

				<p>NoSQL is a non-relational database, meaning it allows different structures than a SQL database and more flexibility to use a format that best fits the data. The term "NoSQL" was introduced in the early 2000s. NoSQL supports some SQL commands. "NoSQL" is sometmes defined as "not only SQL".</p>

				<p>In general, SQL databases can scale vertically, meaning you can increase the load on a server by migrating to a larger server that adds more CPU, RAM or SSD capability. While vertical scalability is used most frequently, SQL databases can also scale horizontally through sharding or partitioning logic, although that’s not well-supported. NoSQL databases scale better horizontally, which means one can add additional servers or nodes as needed to increase load.</p>

				<p>SQL is a good choice when working with related data. Relational databases are efficient, flexible and easily accessed by any application. A benefit of a relational database is that when one user updates a specific record, every instance of the database automatically refreshes, and that information is provided in real-time. While SQL is valued for ensuring data validity, NoSQL is good when it’s more important that the availability of big data is fast. It’s also a good choice when a company will need to scale because of changing requirements. NoSQL is easy-to-use, flexible and offers high performance.</p>
			</article>

			{/* second article */}
			<article className={styles.blogContainer}>
				<h3>What is JWT, and how does it works?</h3>

				<p>JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.</p>

				<p>In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are: Header, Payload and Signature.</p>

				<p><strong>Header</strong>: The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.</p>

				<p><strong>Payload</strong>: The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.</p>
				<p><strong>Signature</strong>: The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.</p>
			</article>

			{/* third article */}
			<article className={styles.blogContainer}>
				<h3>What is the difference between JavaScript and Node.js?</h3>

				<p>JavaScipt is an interprated programming language that is one of the core technologies WWW(World Wide Web), alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side. JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard. It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM). </p>

				<p>Node.js is an open-source server environment. Node.js is cross-platform and runs on Windows, Linux, Unix, Mac OS, etc. Node.js is a back-end JavaScript runtime environment. Node.js runs on a JavaScript Engine (i.e. V8 engine) and executes JavaScript code outside a web browser.</p>

				<p>JavaScript is a language itself. Meanwhile, Node.js is a runtime environment that runs JavaScripts out of the browser. Since, JavaScript is language, people can roll their own interprater or even compiler. While Node.js is most likely an interprater that means it's not a language like JavaScript.</p>
			</article>

			{/* fourth article */}
			<div className={styles.blogContainer}>
				<h3>How does Node.js handle multiple requests at the same time?</h3>
				<p>Node.js is a single-threaded runtime. This means it can only process one request at a time. NodeJS Web Server maintains a limited Thread Pool to provide services to client requests. Multiple clients make multiple requests to the NodeJS server. NodeJS receives these requests and places them into the EventQueue. NodeJS server has an internal component referred to as the EventLoop which is an infinite loop that receives requests and processes them. This EventLoop is single threaded. In other words, EventLoop is the listener for the EventQueue.</p>

				<p>The event-driven model is very efficient and allows NodeJS to handle thousands of concurrent requests with ease. Node.js uses two concepts, Non-blocking I/O and Asynchronous</p>

				<p>
					Whenever a client sends a request the single thread will send that request to someone else. The current thread will not be busy working with that request. There are workers working for the server. The server sends the request to the worker, the worker further sends it to the other server and waits for the response. In the meantime if there is another request the thread will send it to another worker and the worker will wait for the response from the another server.
				</p>

				<p>
					In this way the single thread will always be available to take the requests from the client. It will not block the requests.
				</p>
			</div>
		</section>
	);
}

export default Blog;