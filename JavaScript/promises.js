function database(){
	console.log("Processing database");
	const intern = {
		name:"nitin",
		semester:7,
		age:21,
		company:"ngp websmart"
	}
	return intern;
}

function login(){
	return new Promise(
		(resolve)=>{
			setTimeout(
				()=> {
					console.log("Login process started");
					database();
					resolve("login process success");
				}
				,3000		
			)		
		}
	);
}

function getProfile(){
	return new Promise(
		(resolve)=>{
		setTimeout(
			()=> {
				console.log("getting profile");
				resolve("Sucessfully fetched profile");
			},
			2000
		)
	}
	);
}

function dashboard()
{
	const openDashboard= new Promise(
		(resolve,reject)=>
		{
			console.log("Dashboard loaded");
			resolve("Task completed Successfully ");
		}
	)
	return openDashboard;
}


function perform_callback()
{
	console.log("Callback process");
	login().then(
	(res)=>{ 
		return getProfile().then(
		(res)=>{
			return dashboard().then(
				(res)=>{
				console.log(res);
				}
			)
			}
		)
		}
	)
};

async function perform_async_await()
{
	console.log("Async/await process");
	await login();
	await getProfile();
	await dashboard();
	console.log("Task completed Successfully ");

}

//perform_callback();
//perform_async_await();


function rejection()
{
	const rejection_function= new Promise(
		(res,rej)=>{
			rej("Functionality failed");
		}
	)
}
async function success()
{
	const success_function= new Promise(
		(res,rej)=>{
			res("Functionality success");
		}
	)
}


rejection().then(
	(resposne)=>{
		success()
	}
)


