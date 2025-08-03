# Claude Code Best Practices Guide

## Overview
This guide documents proven best practices and workflows for building complex applications using Claude Code. These patterns consistently lead to exceptional productivity, organization, and code quality across different project types and tech stacks.

## Core Principles

### 1. **Maintain a Living Development Log (CLAUDE.md)**
- **Purpose**: Central source of truth for project context
- **Location**: `/CLAUDE.md` in project root
- **Auto-read**: Claude Code automatically reads this file at session start
- **Update Frequency**: After every major milestone or decision

**Template Structure:**
```markdown
# Project Development Log

## Project Overview
[Brief description and tech stack]

## Current Status (Last Updated: YYYY-MM-DD)
**🎉 [MILESTONE]: [Brief description]**

### ✅ Completed Tasks
[Numbered list of completed work]

### 🚧 Current Priority
[What to focus on next]

## Key Decisions Made
[Architecture choices, tool selections, etc.]

## Important Context
- **User**: [Name and preferences]
- **Project location**: [File path]
- **Work schedule**: [Time constraints]

## Git Information
- Repository: [Git URL]
- Current branch: [Branch name]
- Main branches: [Branch strategy]

## Notes for Next Session
[Reminders and context for continuation]
```

### 2. **Use Todo Lists Proactively**
- **When**: For any task with 3+ steps or complex multi-part work
- **Tool**: Claude Code's TodoWrite function
- **Pattern**: Create → Update in real-time → Mark complete immediately
- **Benefit**: Maintains progress visibility and prevents forgotten tasks

### 3. **Document Infrastructure Decisions**
Create dedicated documentation files:
- `infrastructure/database-schema.md` - Database design and rationale
- `API-KEYS.md` - Authentication documentation (security upgrade needed post-development)
- `backend/README.md` - Setup and deployment instructions

### 4. **Consistent Naming Conventions**
- **Project Identifier**: Use consistent prefix (e.g., "APP" for your application)
- **Cloud Resources**: Tag everything with `Project=APP`, `Environment=dev`
- **File Structure**: Clear separation (`frontend/`, `backend/`, `infrastructure/`, `shared/`)

## Workflow Patterns

### Session Continuity
1. **Session Start**: Claude reads CLAUDE.md automatically for context
2. **Work Sessions**: Update CLAUDE.md with progress and decisions
3. **Session End**: Document next steps and current status
4. **Interruptions**: CLAUDE.md provides seamless handoff between sessions

### Planning Complex Features
```markdown
## Example: Cloud Backend Setup
1. Create todos for each major component
2. Break down into infrastructure → functions → testing
3. Update todos in real-time as work progresses
4. Document architectural decisions in dedicated files
5. Update CLAUDE.md with completion status
```

### Git Branch Management
- **Feature Branches**: Use descriptive names (`#2-backend-setup`, `#3-user-auth`)
- **Documentation**: Track branch purpose in CLAUDE.md
- **Completion**: Mark branches as complete with ✅ in documentation

## Communication Patterns

### Effective Prompting
- **Context First**: "Looking at our CLAUDE.md, continue with..."
- **Specific Tasks**: "Add this to our todo list and start working on..."
- **Iterative Feedback**: "This looks good, but can we also add..."

### Documentation Preferences
```markdown
## User Feedback Patterns That Work:
- "Let's document this in our existing files rather than create new ones"
- "Add this to the backlog for later"
- "Update our CLAUDE.md with this decision"
- "Should we stay on branch #2 to complete this work?"
```

### Security and Best Practices
- **API Keys**: Use placeholder keys during development (e.g., `APP-admin-2025-secure-key`)
  - ⚠️ **CRITICAL**: Upgrade to proper secure tokens before production
  - Move to environment variables or secure key management (AWS Systems Manager, etc.)
- **Testing**: Always test APIs with proper authentication from the start
- **Deployment**: Use consistent deployment commands and document them

## File Organization Best Practices

### Project Structure
```
project-root/
├── CLAUDE.md                    # Main development log
├── API-KEYS.md                  # Authentication docs (dev keys only!)
├── frontend/                    # Frontend code
├── backend/                     # Serverless functions
│   ├── functions/              # Cloud functions (Lambda/Cloud Functions)
│   ├── lib/                   # Shared libraries
│   └── template.yaml          # Infrastructure template (SAM/Terraform)
├── infrastructure/             # Infrastructure docs
│   ├── scripts/               # Setup scripts
│   └── database-schema.md     # Database documentation
└── data/                      # Sample data and exports
```

### Documentation Strategy
- **Central Log**: CLAUDE.md for overall progress
- **Specific Docs**: Dedicated files for technical details
- **Decision Records**: Capture "why" not just "what"
- **Future Context**: Write for someone joining the project later

## Technology Integration Patterns

### Cloud Provider Flexibility
Support multiple cloud providers in your documentation:
- **AWS**: DynamoDB, Lambda, S3, API Gateway, Systems Manager
- **GCP**: Firestore, Cloud Functions, Cloud Storage, Cloud Endpoints
- **Infrastructure as Code**: SAM, Terraform, or cloud-specific tools

### Frontend Integration
- **AI-Generated UI**: Leverage tools like Lovable for rapid UI generation
  - Clone generated repositories with custom SSH configs if needed
  - Migrate from generated framework to production framework (e.g., Vite → Next.js)
  - Document UI framework decisions and migration paths
- **Monorepo Structure**: Separate frontend/backend with shared utilities

### External Service Integration
- **Domain Management**: Document domain purchases (Squarespace, etc.)
- **Third-party APIs**: Plan integration patterns early
- **Data Import**: Design bulk import systems for existing data

## Testing and Quality Assurance

### API Testing Pattern
1. **Postman Collections**: Document API endpoints with examples
2. **Authentication**: Test with placeholder keys, document production upgrade path
3. **Error Handling**: Test failure cases, not just happy path
4. **Documentation**: Keep API docs updated with authentication requirements

### Code Quality
- **Linting**: Run lint/typecheck commands after changes
- **Security**: Never commit real secrets, use placeholder keys for development
- **Error Handling**: Implement proper error responses and logging

## Development Timeline Planning

### Project Phases
- **Phase 1**: Infrastructure setup (~2-4 weeks for complex apps)
- **Phase 2**: Core functionality (~4-8 weeks depending on scope)
- **Phase 3**: Integration and testing (~2-4 weeks)
- **Phase 4**: Production deployment and optimization (~1-2 weeks)

### Milestone Tracking
- Document weekly progress in CLAUDE.md
- Plan realistic ~12-20 week development cycles for full-stack apps
- Break large features into 1-2 week chunks

## Success Metrics

### What Makes Projects Successful:
1. **Organized Documentation**: CLAUDE.md provides perfect context handoffs
2. **Proactive Todo Management**: Never lose track of multi-step tasks
3. **Real-time Updates**: Documentation stays current with development
4. **User Feedback Loop**: Regular check-ins and preference documentation
5. **Security Planning**: Authentication implemented early with upgrade path
6. **Testing Integration**: API testing documented and repeatable

### Productivity Indicators:
- **Rapid Infrastructure Setup**: Full cloud infrastructure in single sessions
- **Zero Lost Context**: Seamless continuation across interruptions
- **Quality Code**: Proper error handling, authentication, documentation
- **Team Ready**: Comprehensive docs for team onboarding

## Recommended Tools Integration

### Claude Code + External Tools:
- **Postman**: API testing with documented collections
- **Cloud CLI**: Infrastructure management with scripted commands (AWS CLI, gcloud)
- **Git**: Branch management with documented strategy
- **VS Code**: File editing with Claude Code integration

### Development Workflow:
1. **Plan** → Document in CLAUDE.md and todos
2. **Build** → Use Claude Code for implementation
3. **Test** → Postman for API testing
4. **Document** → Update all relevant .md files
5. **Deploy** → Use scripted commands, document results
6. **Iterate** → Repeat with updated context

## Git and Deployment Patterns

### Custom SSH Configuration
For projects requiring custom SSH configs:
```bash
# Example: Custom SSH config for specific repositories
git@github.com-custom:username/repository.git
```

### Commit Message Standards
Use consistent commit messages with AI attribution:
```
Add user authentication system

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Deployment Automation
- **Development**: Use SAM, Terraform, or similar for infrastructure
- **CI/CD**: Document deployment pipelines early
- **Environment Management**: Separate dev/staging/prod configurations

## Security Backlog Pattern

Always maintain a security upgrade section in CLAUDE.md:
```markdown
## 🔒 Security Backlog Items
- **API Key Security Upgrade** (Priority: High for Production)
  - Replace hardcoded placeholder keys with proper secure tokens
  - Implement cloud key management (AWS Systems Manager, GCP Secret Manager)
  - Add key rotation strategy and rate limiting
  - Consider OAuth/JWT for user authentication
  - **Current Status**: Using placeholder keys for development only
```

## Template Files

### New Project Checklist:
- [ ] Create CLAUDE.md with project overview
- [ ] Set up consistent naming convention and project identifier
- [ ] Create folder structure (`frontend/`, `backend/`, etc.)
- [ ] Document git strategy and branch naming
- [ ] Set up todo list for initial tasks
- [ ] Create infrastructure documentation files
- [ ] Establish API testing workflow with Postman
- [ ] Plan security upgrade path from placeholder to production keys
- [ ] Document deployment and CI/CD strategy

---

**Key Takeaway**: The combination of living documentation (CLAUDE.md), proactive todo management, and real-time updates creates a development environment where Claude Code can maintain perfect context across sessions and deliver production-quality results efficiently.

*This guide is based on successful development patterns across multiple projects, consistently achieving full infrastructure setup, authentication, and core functionality implementation in accelerated timeframes.*