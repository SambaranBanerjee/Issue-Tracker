from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

# In-memory storage for issues
issues = []

# Sample data for demonstration
sample_issues = [
    {
        "id": str(uuid.uuid4()),
        "title": "Login page not responsive",
        "status": "open",
        "priority": "high",
        "assignee": "john.doe@example.com",
        "createdAt": datetime(2023, 5, 10).isoformat(),
        "updatedAt": datetime(2023, 5, 15).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Add user registration feature",
        "status": "in progress",
        "priority": "medium",
        "assignee": "jane.smith@example.com",
        "createdAt": datetime(2023, 5, 12).isoformat(),
        "updatedAt": datetime(2023, 5, 14).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Fix database connection issue",
        "status": "closed",
        "priority": "high",
        "assignee": "alex.wong@example.com",
        "createdAt": datetime(2023, 5, 8).isoformat(),
        "updatedAt": datetime(2023, 5, 16).isoformat()
    }
]

issues.extend(sample_issues)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"})

@app.route('/issues', methods=['GET'])
def get_issues():
    # Pagination parameters
    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('pageSize', 10))
    
    # Filtering parameters
    status_filter = request.args.get('status')
    priority_filter = request.args.get('priority')
    assignee_filter = request.args.get('assignee')
    
    # Search parameter
    search_query = request.args.get('search')
    
    # Sorting parameter
    sort_by = request.args.get('sortBy', 'updatedAt')
    sort_order = request.args.get('sortOrder', 'desc')
    
    # Apply filters
    filtered_issues = issues.copy()
    
    if status_filter:
        filtered_issues = [issue for issue in filtered_issues if issue['status'] == status_filter]
    
    if priority_filter:
        filtered_issues = [issue for issue in filtered_issues if issue['priority'] == priority_filter]
    
    if assignee_filter:
        filtered_issues = [issue for issue in filtered_issues if issue['assignee'] == assignee_filter]
    
    if search_query:
        filtered_issues = [issue for issue in filtered_issues if search_query.lower() in issue['title'].lower()]
    
    # Apply sorting
    reverse_order = sort_order.lower() == 'desc'
    filtered_issues.sort(key=lambda x: x[sort_by], reverse=reverse_order)
    
    # Apply pagination
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    paginated_issues = filtered_issues[start_index:end_index]
    
    return jsonify({
        "issues": paginated_issues,
        "total": len(filtered_issues),
        "page": page,
        "pageSize": page_size
    })

@app.route('/issues/<id>', methods=['GET'])
def get_issue(id):
    issue = next((issue for issue in issues if issue['id'] == id), None)
    if issue:
        return jsonify(issue)
    return jsonify({"error": "Issue not found"}), 404

@app.route('/issues', methods=['POST'])
def create_issue():
    data = request.get_json()
    
    if not data or 'title' not in data:
        return jsonify({"error": "Title is required"}), 400
    
    new_issue = {
        "id": str(uuid.uuid4()),
        "title": data['title'],
        "status": data.get('status', 'open'),
        "priority": data.get('priority', 'medium'),
        "assignee": data.get('assignee', ''),
        "createdAt": datetime.now().isoformat(),
        "updatedAt": datetime.now().isoformat()
    }
    
    issues.append(new_issue)
    return jsonify(new_issue), 201

@app.route('/issues/<id>', methods=['PUT'])
def update_issue(id):
    data = request.get_json()
    
    issue = next((issue for issue in issues if issue['id'] == id), None)
    if not issue:
        return jsonify({"error": "Issue not found"}), 404
    
    # Update fields if provided
    if 'title' in data:
        issue['title'] = data['title']
    if 'status' in data:
        issue['status'] = data['status']
    if 'priority' in data:
        issue['priority'] = data['priority']
    if 'assignee' in data:
        issue['assignee'] = data['assignee']
    
    issue['updatedAt'] = datetime.now().isoformat()
    
    return jsonify(issue)

if __name__ == '__main__':
    app.run(debug=True)