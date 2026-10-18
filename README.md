# Student Finance Tracker 

**Introduction**

The purpose of this website is to help students manage their money, track their daily expenses, and understand how they spend their money. I developed this website using HTML, CSS, and JavaScript.

**1. Dashboard**

First, we have the dashboard. It displays the total number of expenses, the total amount spent, and the category where the student spends the most money.

We also have a chart showing spending over the last seven days. This helps students understand their spending habits and manage their budgets more effectively.

**2. Adding and Managing Expenses**

Next, we have the expense form. Here, users can enter the description of an expense, the amount, its category, and the date.

For example, I can add an expense for lunch, enter the amount, select Food as the category, and choose the date. After clicking the Add Expense button, the expense appears in the records table.

Users can also edit existing expenses or delete them after confirming the action.

**3. Searching and Sorting**

The website also includes a search feature that uses regular expressions, also known as regex.

For example, I can search for the word “coffee” to find expenses related to coffee. If I enter an invalid regex pattern, the website displays an error instead of crashing.

Users can also sort their records by date, description, or amount, making it easier to find specific expenses.

**4. Settings and Budget Management**

In the Settings section, users can set a spending limit. The website then shows how much money remains or warns them if they exceed their limit.

Users can also enter manual exchange rates for US dollars and euros to see basic currency conversions.

**5. Importing, Exporting, and Saving Data**

Another important feature is data persistence. The website saves expenses in the browser using localStorage, so records remain available after refreshing the page.

Users can also export their records as a JSON file or import records from another JSON file. The website validates imported data before accepting it.

**6. Accessibility and Conclusion**

Finally, I included responsive styling so the website can adapt to different screen sizes. I also used semantic HTML, labels, keyboard focus indicators, and accessible status messages to make the website easier to use.

In conclusion, the Student Finance Tracker demonstrates how HTML, CSS, and JavaScript can be used to build a practical application with form validation, regular expressions, data storage, search, sorting, and statistics.
