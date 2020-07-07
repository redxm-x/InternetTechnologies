let Open = {
    ">>":"q",
    "-!":"del",
    "_!":"ins",
}
let Close = {
    "<<":"q",
    "!-":"del",
    "!_":"ins",
}

charset ={
    "**":"strong",
    "*": "em"
}

class Check {
	constructor() {
		this.codeClass = "";
		this.content = "";
		this.flags = false;
	}
	static start = "[";
	static separator = "|";
	static stop = "]";
	write(char) {
		if(this.flags)
			this.content += char;
		else if(char == Check.separator /*!*/)
			this.flags = true;
		else
			this.codeClass += char;
	}
	toString() {
		return "<a href=\"" + this.codeClass + "\">" + this.content + "</a>";
	}
}

class Check1 {
	constructor() {
		this.type = "";
		this.head = "";
		this.content = "";
		this.flag = false;
		this.flags = false;
	}
	input(inputClass) {
		if(this.flag)
			this.content += inputClass;
		else if(this.flags)
			if(inputClass == "}")
				this.flag = true;
			else
				this.head += inputClass;
		else
			if(inputClass == "|")
				this.flags = true;
			else
				this.type += inputClass;
	}
	toString() {
		return "<aside cat=\"" + this.type + "\"><header>" + this.head + "</header>" + "<main>" + this.content + "</main>" + "</aside>";
	}
}

class Hash {
	constructor() {
		this.id = Hash.incrementId();
		this.content = "";
		this.flag = false;
	}
	hashChar(char) {
		if(this.flag)
			this.content += char;
		else
			this.content += char;
			this.flag = true;


	}
	toString() {
		return "<h1 id=\"" + this.id + "\">" + this.content + "</h1>";}
	static incrementId() {
		if (!this.latestId) this.latestId = 1
		else this.latestId++
		return this.latestId
	  }
}


let test = ``;
let out = "";
let stack = [];
let oldChar = "";
for(let line of test.split("\n")) {
	line = line.trim();
	if(line[0] == "{") {
		let bufor = new Check1();
		for(let char of line.substr(1))
			bufor.input(char);
			out += bufor+"\n";
		}
	else if(line[0] =="#"){
		let bufor = new Hash();
		for(let char of line.substr(1))
			bufor.hashChar(char);
			out += bufor+"\n";

	}

	else{
		out+= "<p>"
		for(let char of line){

			if(charset[oldChar+char]) {

				if(stack[0] == charset[oldChar+char]) {
					out += "</"
						+ stack.shift()
						+ ">";
				}
				else {
					stack.unshift(charset[oldChar+char]);
					out += "<"
						+ stack[0]
						+ ">";
				}
				oldChar = "";
			}
			else if(charset[oldChar]) {
				if(stack[0] == charset[oldChar]) {
					out += "</"
						+ stack.shift()
						+ ">";
				}
				else {
					stack.unshift(charset[oldChar]);
					out += "<"
						+ stack[0]
						+ ">";
				}
				oldChar = char;

			}
			else if(Open[oldChar+char]) {
				stos.unshift(Open[oldChar+char]);
				out += "<"+ Open[oldChar+char] +">";
				oldChar = "";
			}
			else if(Close[oldChar+char]) {
				if(stack[0] == Close[oldChar+char]) {
					out += "</"+ Close[oldChar+char] + ">";
					oldChar = "";
					stack.shift();
				}
				else {
					out += "<!--Błąd - próbuję domknąć </" + Close[oldChar+char] + "> zamiast </" + stack[0] + ">-->";
					break;
				}
			}
			else if(stack[0]	&& stack[0].constructor.name =="Check"	) {
				if(char == Check.stop /*!*/) {
					out += stack.shift();
				}
				else {
					stack[0].write(char);
				}
			}
			else if(char == Check.start /*!*/) {
				stack.unshift(new Check());
			}

			else {

				out += oldChar;
				oldChar = Check;

			}
    }
		out += oldChar;
		out += "</p>\n"
		oldChar = ""
	}



}

while(stack[0]) {
	out += "<!--Błąd: nie domknięty blok </"+stack.shift()+">-->";
}



console.log(out);
