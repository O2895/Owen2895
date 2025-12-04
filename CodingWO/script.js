// Current selected language
let currentLanguage = 'python';
let pyodide = null;

// Initialize Pyodide for Python execution
async function initPyodide() {
    if (!pyodide) {
        pyodide = await loadPyodide();
    }
    return pyodide;
}

// Lessons data structure - supports both Python and C++
const lessonsData = {
    python: [
        {
            id: 1,
            title: "Hello, World!",
            icon: "👋",
            difficulty: "beginner",
            description: "Your first program - learn the basics of output",
            content: `
                <h3>Welcome to Programming!</h3>
                <p>Every programmer starts with a simple "Hello, World!" program. It's a tradition that dates back to the 1970s.</p>
                
                <h3>What You'll Learn</h3>
                <ul>
                    <li>How to display text to the screen</li>
                    <li>Basic Python syntax</li>
                    <li>Using the print() function</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code>print("Hello, World!")
print("Welcome to CodingW/O!")</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Type your own message in the code editor below and click "Run Code" to see it displayed!</p>
            `,
            starterCode: `print("Hello, World!")
print("I'm learning to code!")`
        },
        {
            id: 2,
            title: "Variables & Data Types",
            icon: "📦",
            difficulty: "beginner",
            description: "Store and manipulate data with variables",
            content: `
                <h3>What are Variables?</h3>
                <p>Variables are like containers that store information. In Python, you don't need to declare variable types - Python figures it out automatically!</p>
                
                <h3>Data Types</h3>
                <ul>
                    <li><strong>String:</strong> Text data (e.g., "Hello")</li>
                    <li><strong>Integer:</strong> Whole numbers (e.g., 42)</li>
                    <li><strong>Float:</strong> Decimal numbers (e.g., 3.14)</li>
                    <li><strong>Boolean:</strong> True or False</li>
                    <li><strong>List:</strong> A collection of items</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code>name = "CodingW/O"
age = 2024
is_learning = True

print("Name:", name)
print("Age:", age)
print("Learning:", is_learning)</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create your own variables and display them!</p>
            `,
            starterCode: `my_name = "Your Name"
my_age = 25
my_hobby = "coding"

print("My name is", my_name)
print("I am", my_age, "years old")
print("I love", my_hobby)`
        },
        {
            id: 3,
            title: "Functions",
            icon: "⚙️",
            difficulty: "intermediate",
            description: "Create reusable blocks of code",
            content: `
                <h3>What are Functions?</h3>
                <p>Functions are blocks of code that perform a specific task. They help you organize your code and make it reusable.</p>
                
                <h3>Function Syntax</h3>
                <pre><code>def function_name(parameters):
    # code to execute
    return result</code></pre>
                
                <h3>Example Code</h3>
                <pre><code>def greet(name):
    return "Hello, " + name + "!"

def add(a, b):
    return a + b

print(greet("World"))
print("5 + 3 =", add(5, 3))</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create your own functions and call them!</p>
            `,
            starterCode: `def greet(name):
    return "Hello, " + name + "!"

def multiply(a, b):
    return a * b

print(greet("CodingW/O"))
print("4 × 7 =", multiply(4, 7))`
        },
        {
            id: 4,
            title: "Conditionals",
            icon: "🔀",
            difficulty: "intermediate",
            description: "Make decisions in your code with if/else",
            content: `
                <h3>Making Decisions</h3>
                <p>Conditionals allow your program to make decisions based on different conditions. Use <code>if</code>, <code>elif</code>, and <code>else</code> statements.</p>
                
                <h3>Comparison Operators</h3>
                <ul>
                    <li><code>==</code> Equal to</li>
                    <li><code>!=</code> Not equal to</li>
                    <li><code>&gt;</code> Greater than</li>
                    <li><code>&lt;</code> Less than</li>
                    <li><code>&gt;=</code> Greater than or equal</li>
                    <li><code>&lt;=</code> Less than or equal</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code>age = 18

if age >= 18:
    print("You are an adult!")
else:
    print("You are a minor.")

score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
else:
    print("Grade: C or below")</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create conditional statements for different scenarios!</p>
            `,
            starterCode: `temperature = 25

if temperature > 30:
    print("It's hot outside!")
elif temperature > 20:
    print("It's a nice day!")
else:
    print("It's cold outside!")

number = 7
if number % 2 == 0:
    print(number, "is even")
else:
    print(number, "is odd")`
        },
        {
            id: 5,
            title: "Loops",
            icon: "🔄",
            difficulty: "intermediate",
            description: "Repeat actions with for and while loops",
            content: `
                <h3>Repeating Actions</h3>
                <p>Loops allow you to repeat code multiple times. Python has <code>for</code> and <code>while</code> loops.</p>
                
                <h3>Types of Loops</h3>
                <ul>
                    <li><strong>for loop:</strong> Iterate over a sequence</li>
                    <li><strong>while loop:</strong> Repeat while a condition is true</li>
                    <li><strong>range()</strong>: Generate sequences of numbers</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code># For loop with range
for i in range(1, 6):
    print("Count:", i)

# While loop
count = 0
while count < 3:
    print("While count:", count)
    count += 1

# For loop with list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print("I like", fruit)</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create loops to repeat actions!</p>
            `,
            starterCode: `# Count from 1 to 10
for i in range(1, 11):
    print("Number:", i)

# Loop through a list
colors = ["red", "green", "blue"]
for color in colors:
    print("Color:", color)

# Calculate sum
sum = 0
for i in range(1, 6):
    sum += i
print("Sum of 1 to 5:", sum)`
        },
        {
            id: 6,
            title: "Lists",
            icon: "📋",
            difficulty: "intermediate",
            description: "Work with lists of data",
            content: `
                <h3>What are Lists?</h3>
                <p>Lists are collections of items stored in a specific order. They're perfect for storing sequences of data.</p>
                
                <h3>List Operations</h3>
                <ul>
                    <li><code>append()</code> - Add item to end</li>
                    <li><code>remove()</code> - Remove item</li>
                    <li><code>len()</code> - Get list size</li>
                    <li><code>index()</code> - Find item position</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code>fruits = ["apple", "banana"]

# Add items
fruits.append("orange")
fruits.append("grape")

# Access items
print("First fruit:", fruits[0])
print("All fruits:", fruits)

# Loop through list
for fruit in fruits:
    print("I like", fruit)</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create and manipulate your own lists!</p>
            `,
            starterCode: `numbers = [1, 2, 3]

# Add numbers
numbers.append(4)
numbers.append(5)

print("All numbers:", numbers)
print("First number:", numbers[0])
print("List length:", len(numbers))

# Calculate sum
sum = 0
for num in numbers:
    sum += num
print("Sum:", sum)`
        },
        {
            id: 7,
            title: "Dictionaries",
            icon: "🎯",
            difficulty: "intermediate",
            description: "Organize data with key-value pairs",
            content: `
                <h3>What are Dictionaries?</h3>
                <p>Dictionaries store data as key-value pairs. They're perfect for representing real-world entities like a person, a car, or a book.</p>
                
                <h3>Dictionary Syntax</h3>
                <pre><code>dictionary_name = {
    "key1": value1,
    "key2": value2
}</code></pre>
                
                <h3>Example Code</h3>
                <pre><code>person = {
    "name": "Alice",
    "age": 25,
    "city": "New York",
    "hobbies": ["reading", "coding"]
}

print("Name:", person["name"])
print("Age:", person["age"])
print("City:", person["city"])
print("Hobbies:", person["hobbies"])

# Add new key
person["email"] = "alice@example.com"
print("Email:", person["email"])</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create your own dictionaries and access their values!</p>
            `,
            starterCode: `book = {
    "title": "Learn Python",
    "author": "CodingW/O",
    "pages": 300,
    "is_read": False
}

print("Book Title:", book["title"])
print("Author:", book["author"])
print("Pages:", book["pages"])

# Update value
book["is_read"] = True
print("Read status:", book["is_read"])

# Add new key
book["rating"] = 5
print("Rating:", book["rating"])`
        },
        {
            id: 8,
            title: "List Comprehensions",
            icon: "✨",
            difficulty: "advanced",
            description: "Create lists efficiently with comprehensions",
            content: `
                <h3>What are List Comprehensions?</h3>
                <p>List comprehensions provide a concise way to create lists. They're a Pythonic way to write loops that build lists.</p>
                
                <h3>Basic Syntax</h3>
                <pre><code>[expression for item in iterable]</code></pre>
                
                <h3>Example Code</h3>
                <pre><code># Square numbers
squares = [x**2 for x in range(1, 6)]
print("Squares:", squares)

# Filter even numbers
evens = [x for x in range(1, 11) if x % 2 == 0]
print("Even numbers:", evens)

# Transform strings
names = ["alice", "bob", "charlie"]
capitalized = [name.capitalize() for name in names]
print("Capitalized:", capitalized)</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create lists using comprehensions!</p>
            `,
            starterCode: `# Create list of squares
squares = [x**2 for x in range(1, 6)]
print("Squares:", squares)

# Filter numbers greater than 5
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filtered = [x for x in numbers if x > 5]
print("Numbers > 5:", filtered)

# Double each number
doubled = [x * 2 for x in range(1, 6)]
print("Doubled:", doubled)`
        }
    ],
    cpp: [
        {
            id: 1,
            title: "Hello, World!",
            icon: "👋",
            difficulty: "beginner",
            description: "Your first program - learn the basics of output",
            content: `
                <h3>Welcome to C++ Programming!</h3>
                <p>Every programmer starts with a simple "Hello, World!" program. C++ is a powerful language used for system programming, games, and high-performance applications.</p>
                
                <h3>What You'll Learn</h3>
                <ul>
                    <li>Basic C++ program structure</li>
                    <li>Using <code>#include</code> directives</li>
                    <li>The <code>main()</code> function</li>
                    <li>Using <code>std::cout</code> for output</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code>#include &lt;iostream&gt;

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "Welcome to CodingW/O!" << std::endl;
    return 0;
}</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Note: C++ code needs to be compiled. The code editor shows the structure - compile and run locally to see output!</p>
            `,
            starterCode: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "I'm learning to code!" << std::endl;
    return 0;
}`
        },
        {
            id: 2,
            title: "Variables & Data Types",
            icon: "📦",
            difficulty: "beginner",
            description: "Store and manipulate data with variables",
            content: `
                <h3>What are Variables?</h3>
                <p>Variables are containers that store information. In C++, you must declare the type of each variable.</p>
                
                <h3>Data Types</h3>
                <ul>
                    <li><strong>int:</strong> Integer numbers (e.g., 42)</li>
                    <li><strong>float:</strong> Floating-point numbers (e.g., 3.14f)</li>
                    <li><strong>double:</strong> Double precision floats (e.g., 3.14)</li>
                    <li><strong>char:</strong> Single characters (e.g., 'A')</li>
                    <li><strong>string:</strong> Text data (e.g., "Hello")</li>
                    <li><strong>bool:</strong> True or false</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

int main() {
    std::string name = "CodingW/O";
    int age = 2024;
    bool isLearning = true;
    
    std::cout << "Name: " << name << std::endl;
    std::cout << "Age: " << age << std::endl;
    std::cout << "Learning: " << isLearning << std::endl;
    return 0;
}</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create your own variables and display them!</p>
            `,
            starterCode: `#include <iostream>
#include <string>

int main() {
    std::string myName = "Your Name";
    int myAge = 25;
    std::string myHobby = "coding";
    
    std::cout << "My name is " << myName << std::endl;
    std::cout << "I am " << myAge << " years old" << std::endl;
    std::cout << "I love " << myHobby << std::endl;
    return 0;
}`
        },
        {
            id: 3,
            title: "Functions",
            icon: "⚙️",
            difficulty: "intermediate",
            description: "Create reusable blocks of code",
            content: `
                <h3>What are Functions?</h3>
                <p>Functions are blocks of code that perform a specific task. They help you organize your code and make it reusable.</p>
                
                <h3>Function Syntax</h3>
                <pre><code>return_type function_name(parameters) {
    // code to execute
    return value;
}</code></pre>
                
                <h3>Example Code</h3>
                <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

std::string greet(std::string name) {
    return "Hello, " + name + "!";
}

int add(int a, int b) {
    return a + b;
}

int main() {
    std::cout << greet("World") << std::endl;
    std::cout << "5 + 3 = " << add(5, 3) << std::endl;
    return 0;
}</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create your own functions and call them!</p>
            `,
            starterCode: `#include <iostream>
#include <string>

std::string greet(std::string name) {
    return "Hello, " + name + "!";
}

int multiply(int a, int b) {
    return a * b;
}

int main() {
    std::cout << greet("CodingW/O") << std::endl;
    std::cout << "4 × 7 = " << multiply(4, 7) << std::endl;
    return 0;
}`
        },
        {
            id: 4,
            title: "Conditionals",
            icon: "🔀",
            difficulty: "intermediate",
            description: "Make decisions in your code with if/else",
            content: `
                <h3>Making Decisions</h3>
                <p>Conditionals allow your program to make decisions based on different conditions. Use <code>if</code>, <code>else if</code>, and <code>else</code> statements.</p>
                
                <h3>Comparison Operators</h3>
                <ul>
                    <li><code>==</code> Equal to</li>
                    <li><code>!=</code> Not equal to</li>
                    <li><code>&gt;</code> Greater than</li>
                    <li><code>&lt;</code> Less than</li>
                    <li><code>&gt;=</code> Greater than or equal</li>
                    <li><code>&lt;=</code> Less than or equal</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code>#include &lt;iostream&gt;

int main() {
    int age = 18;
    
    if (age >= 18) {
        std::cout << "You are an adult!" << std::endl;
    } else {
        std::cout << "You are a minor." << std::endl;
    }
    
    int score = 85;
    if (score >= 90) {
        std::cout << "Grade: A" << std::endl;
    } else if (score >= 80) {
        std::cout << "Grade: B" << std::endl;
    } else {
        std::cout << "Grade: C or below" << std::endl;
    }
    return 0;
}</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create conditional statements for different scenarios!</p>
            `,
            starterCode: `#include <iostream>

int main() {
    int temperature = 25;
    
    if (temperature > 30) {
        std::cout << "It's hot outside!" << std::endl;
    } else if (temperature > 20) {
        std::cout << "It's a nice day!" << std::endl;
    } else {
        std::cout << "It's cold outside!" << std::endl;
    }
    
    int number = 7;
    if (number % 2 == 0) {
        std::cout << number << " is even" << std::endl;
    } else {
        std::cout << number << " is odd" << std::endl;
    }
    return 0;
}`
        },
        {
            id: 5,
            title: "Loops",
            icon: "🔄",
            difficulty: "intermediate",
            description: "Repeat actions with for and while loops",
            content: `
                <h3>Repeating Actions</h3>
                <p>Loops allow you to repeat code multiple times. C++ has <code>for</code>, <code>while</code>, and <code>do-while</code> loops.</p>
                
                <h3>Types of Loops</h3>
                <ul>
                    <li><strong>for loop:</strong> Repeat a specific number of times</li>
                    <li><strong>while loop:</strong> Repeat while a condition is true</li>
                    <li><strong>range-based for:</strong> Iterate over containers</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code>#include &lt;iostream&gt;

int main() {
    // For loop
    for (int i = 1; i <= 5; i++) {
        std::cout << "Count: " << i << std::endl;
    }
    
    // While loop
    int count = 0;
    while (count < 3) {
        std::cout << "While count: " << count << std::endl;
        count++;
    }
    
    // Range-based for (C++11)
    int arr[] = {10, 20, 30};
    for (int num : arr) {
        std::cout << "Number: " << num << std::endl;
    }
    return 0;
}</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create loops to repeat actions!</p>
            `,
            starterCode: `#include <iostream>

int main() {
    // Count from 1 to 10
    for (int i = 1; i <= 10; i++) {
        std::cout << "Number: " << i << std::endl;
    }
    
    // Calculate sum
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    std::cout << "Sum of 1 to 5: " << sum << std::endl;
    return 0;
}`
        },
        {
            id: 6,
            title: "Arrays",
            icon: "📋",
            difficulty: "intermediate",
            description: "Work with arrays of data",
            content: `
                <h3>What are Arrays?</h3>
                <p>Arrays are collections of items of the same type stored in contiguous memory. They're perfect for storing sequences of data.</p>
                
                <h3>Array Operations</h3>
                <ul>
                    <li>Access elements with index: <code>arr[0]</code></li>
                    <li>Size is fixed at declaration</li>
                    <li>Index starts at 0</li>
                    <li>Use loops to iterate</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code>#include &lt;iostream&gt;

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};
    
    // Access elements
    std::cout << "First number: " << numbers[0] << std::endl;
    
    // Loop through array
    for (int i = 0; i < 5; i++) {
        std::cout << "Number " << i << ": " << numbers[i] << std::endl;
    }
    
    // Calculate sum
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += numbers[i];
    }
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create and manipulate your own arrays!</p>
            `,
            starterCode: `#include <iostream>

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};
    
    std::cout << "All numbers: ";
    for (int i = 0; i < 5; i++) {
        std::cout << numbers[i] << " ";
    }
    std::cout << std::endl;
    
    std::cout << "First number: " << numbers[0] << std::endl;
    std::cout << "Array size: 5" << std::endl;
    
    // Calculate sum
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += numbers[i];
    }
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}`
        },
        {
            id: 7,
            title: "Vectors",
            icon: "🎯",
            difficulty: "intermediate",
            description: "Dynamic arrays with the vector class",
            content: `
                <h3>What are Vectors?</h3>
                <p>Vectors are dynamic arrays that can grow and shrink in size. They're part of the Standard Template Library (STL).</p>
                
                <h3>Vector Operations</h3>
                <ul>
                    <li><code>push_back()</code> - Add element to end</li>
                    <li><code>size()</code> - Get vector size</li>
                    <li><code>at()</code> - Access element with bounds checking</li>
                    <li><code>pop_back()</code> - Remove last element</li>
                </ul>
                
                <h3>Example Code</h3>
                <pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;

int main() {
    std::vector&lt;int&gt; numbers;
    
    // Add elements
    numbers.push_back(10);
    numbers.push_back(20);
    numbers.push_back(30);
    
    // Access elements
    std::cout << "First: " << numbers[0] << std::endl;
    std::cout << "Size: " << numbers.size() << std::endl;
    
    // Loop through vector
    for (int num : numbers) {
        std::cout << "Number: " << num << std::endl;
    }
    return 0;
}</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create and manipulate your own vectors!</p>
            `,
            starterCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers;
    
    numbers.push_back(1);
    numbers.push_back(2);
    numbers.push_back(3);
    numbers.push_back(4);
    numbers.push_back(5);
    
    std::cout << "Size: " << numbers.size() << std::endl;
    std::cout << "First: " << numbers[0] << std::endl;
    
    // Calculate sum
    int sum = 0;
    for (int num : numbers) {
        sum += num;
    }
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}`
        },
        {
            id: 8,
            title: "Classes & Objects",
            icon: "🏗️",
            difficulty: "advanced",
            description: "Object-oriented programming with classes",
            content: `
                <h3>What are Classes?</h3>
                <p>Classes are blueprints for creating objects. They encapsulate data and functions that operate on that data.</p>
                
                <h3>Class Syntax</h3>
                <pre><code>class ClassName {
public:
    // public members
private:
    // private members
};</code></pre>
                
                <h3>Example Code</h3>
                <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class Person {
public:
    std::string name;
    int age;
    
    void introduce() {
        std::cout << "Hi, I'm " << name 
                  << " and I'm " << age 
                  << " years old." << std::endl;
    }
};

int main() {
    Person person;
    person.name = "Alice";
    person.age = 25;
    person.introduce();
    return 0;
}</code></pre>
                
                <h3>Try It Yourself</h3>
                <p>Create your own classes and objects!</p>
            `,
            starterCode: `#include <iostream>
#include <string>

class Book {
public:
    std::string title;
    std::string author;
    int pages;
    
    void display() {
        std::cout << "Title: " << title << std::endl;
        std::cout << "Author: " << author << std::endl;
        std::cout << "Pages: " << pages << std::endl;
    }
};

int main() {
    Book book;
    book.title = "Learn C++";
    book.author = "CodingW/O";
    book.pages = 300;
    book.display();
    return 0;
}`
        }
    ]
};

// Get current lessons based on selected language
function getLessons() {
    return lessonsData[currentLanguage] || [];
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    await initPyodide();
    displayLessons();
    updateLanguageDisplay();
});

// Select language
function selectLanguage(lang) {
    currentLanguage = lang;
    
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Update display
    updateLanguageDisplay();
    displayLessons();
    
    // If viewing a lesson, reload it
    if (document.getElementById('lessonContent').style.display !== 'none') {
        const currentTitle = document.getElementById('lessonTitle').textContent;
        const lessons = getLessons();
        const currentLesson = lessons.find(l => l.title === currentTitle);
        if (currentLesson) {
            showLesson(currentLesson.id);
        }
    }
}

// Update language display
function updateLanguageDisplay() {
    const langNames = {
        'python': 'Python',
        'cpp': 'C++'
    };
    document.getElementById('currentLanguage').textContent = langNames[currentLanguage];
}

// Display all lessons
function displayLessons() {
    const lessonsGrid = document.getElementById('lessonsGrid');
    lessonsGrid.innerHTML = '';
    
    const lessons = getLessons();
    
    lessons.forEach(lesson => {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.onclick = () => showLesson(lesson.id);
        
        card.innerHTML = `
            <span class="icon">${lesson.icon}</span>
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
            <span class="difficulty ${lesson.difficulty}">${lesson.difficulty}</span>
        `;
        
        lessonsGrid.appendChild(card);
    });
}

// Show a specific lesson
function showLesson(lessonId) {
    const lessons = getLessons();
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    // Hide lessons grid, show lesson content
    document.querySelector('.lessons-section').style.display = 'none';
    document.getElementById('lessonContent').style.display = 'block';
    
    // Populate lesson content
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonBody').innerHTML = lesson.content;
    document.getElementById('codeEditor').value = lesson.starterCode;
    document.getElementById('codeOutput').textContent = '';
    document.getElementById('codeOutput').style.color = '';
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Show lessons grid
function showLessons() {
    document.querySelector('.lessons-section').style.display = 'block';
    document.getElementById('lessonContent').style.display = 'none';
    window.scrollTo(0, 0);
}

// Run code from editor
async function runCode() {
    const code = document.getElementById('codeEditor').value;
    const output = document.getElementById('codeOutput');
    
    // Clear previous output
    output.textContent = 'Running...';
    output.style.color = '';
    
    if (currentLanguage === 'python') {
        try {
            await initPyodide();
            
            // Capture print output
            let outputText = '';
            pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
            `);
            
            // Execute the code
            pyodide.runPython(code);
            
            // Get the output
            outputText = pyodide.runPython('sys.stdout.getvalue()');
            
            if (outputText) {
                output.textContent = outputText.trim();
            } else {
                output.textContent = 'Code executed successfully (no output)';
            }
        } catch (error) {
            output.textContent = 'Error: ' + error.message;
            output.style.color = '#ff6b6b';
        }
    } else if (currentLanguage === 'cpp') {
        // For C++, show compilation instructions
        output.textContent = `C++ code needs to be compiled and run locally.

To compile and run:
1. Save your code to a file (e.g., program.cpp)
2. Compile: g++ program.cpp -o program
3. Run: ./program (Linux/Mac) or program.exe (Windows)

Or use an online compiler like:
- https://www.onlinegdb.com/online_c++_compiler
- https://cpp.sh/

Your code:
${code}`;
        output.style.color = '#4ECDC4';
    }
}

// Reset code to starter code
function resetCode() {
    const currentTitle = document.getElementById('lessonTitle').textContent;
    const lessons = getLessons();
    const lesson = lessons.find(l => l.title === currentTitle);
    if (lesson) {
        document.getElementById('codeEditor').value = lesson.starterCode;
        document.getElementById('codeOutput').textContent = '';
        document.getElementById('codeOutput').style.color = '';
    }
}
