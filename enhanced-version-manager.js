// Enhanced Version Manager for Smart Fusion System
// Integrates semantic versioning with advanced tracking and analytics

class EnhancedVersionManager {
  constructor() {
    this.currentVersion = { major: 1, minor: 0, patch: 0 }
    this.moduleVersions = new Map()
    this.versionHistory = []
    this.changeLog = []
    this.rollbackPoints = []
    this.branchingStrategy = new BranchingStrategy()
    this.dependencyTracker = new DependencyTracker()
  }

  // Initialize with module versions
  initialize(modules = []) {
    console.log("🔢 Initializing Enhanced Version Manager...")

    modules.forEach((module) => {
      this.moduleVersions.set(module.name, {
        version: { major: 1, minor: 0, patch: 0 },
        lastUpdate: new Date(),
        dependencies: module.dependencies || [],
        changeHistory: [],
      })
    })

    console.log(`✅ Initialized ${modules.length} modules with version tracking`)
    return this.getSystemStatus()
  }

  // Bump version with enhanced tracking
  bumpVersion(changeType, module = "core", description = "", breakingChanges = []) {
    const oldVersion = module === "core" ? { ...this.currentVersion } : { ...this.moduleVersions.get(module)?.version }

    if (!oldVersion) {
      throw new Error(`Module ${module} not found`)
    }

    let newVersion
    if (module === "core") {
      newVersion = this.calculateNewVersion(this.currentVersion, changeType)
      this.currentVersion = newVersion
    } else {
      const moduleData = this.moduleVersions.get(module)
      newVersion = this.calculateNewVersion(moduleData.version, changeType)
      moduleData.version = newVersion
      moduleData.lastUpdate = new Date()
    }

    // Record the change
    const change = {
      id: this.generateChangeId(),
      timestamp: new Date(),
      module,
      changeType,
      from: this.versionToString(oldVersion),
      to: this.versionToString(newVersion),
      description,
      breakingChanges,
      author: "Smart Fusion System",
      impact: this.calculateImpact(changeType, breakingChanges),
    }

    this.versionHistory.push(change)
    this.changeLog.push(change)

    // Check for dependency impacts
    if (module !== "core") {
      this.checkDependencyImpacts(module, changeType, breakingChanges)
    }

    // Create rollback point for major changes
    if (changeType === "major" || breakingChanges.length > 0) {
      this.createRollbackPoint(module, oldVersion, change)
    }

    console.log(`📈 Version bumped: ${module} ${change.from} → ${change.to} (${changeType})`)
    console.log(`   Description: ${description}`)

    if (breakingChanges.length > 0) {
      console.log(`   ⚠️  Breaking changes: ${breakingChanges.join(", ")}`)
    }

    return {
      change,
      newVersion: this.versionToString(newVersion),
      rollbackId: change.id,
    }
  }

  calculateNewVersion(currentVersion, changeType) {
    const newVersion = { ...currentVersion }

    switch (changeType) {
      case "major":
        newVersion.major++
        newVersion.minor = 0
        newVersion.patch = 0
        break
      case "minor":
        newVersion.minor++
        newVersion.patch = 0
        break
      case "patch":
        newVersion.patch++
        break
      default:
        throw new Error(`Invalid change type: ${changeType}`)
    }

    return newVersion
  }

  // Advanced version analysis
  analyzeVersionTrends() {
    console.log("📊 Analyzing version trends...")

    const analysis = {
      totalChanges: this.versionHistory.length,
      changesByType: this.groupChangesByType(),
      changesByModule: this.groupChangesByModule(),
      averageTimeBetweenChanges: this.calculateAverageTimeBetweenChanges(),
      stabilityScore: this.calculateStabilityScore(),
      riskAssessment: this.assessRisk(),
      recommendations: this.generateRecommendations(),
    }

    console.log("📈 Version Analysis Results:")
    console.log(`   Total Changes: ${analysis.totalChanges}`)
    console.log(`   Stability Score: ${analysis.stabilityScore.toFixed(1)}%`)
    console.log(`   Risk Level: ${analysis.riskAssessment.level}`)

    return analysis
  }

  groupChangesByType() {
    const groups = { major: 0, minor: 0, patch: 0 }
    this.versionHistory.forEach((change) => {
      groups[change.changeType]++
    })
    return groups
  }

  groupChangesByModule() {
    const groups = {}
    this.versionHistory.forEach((change) => {
      groups[change.module] = (groups[change.module] || 0) + 1
    })
    return groups
  }

  calculateAverageTimeBetweenChanges() {
    if (this.versionHistory.length < 2) return 0

    const times = []
    for (let i = 1; i < this.versionHistory.length; i++) {
      const diff = this.versionHistory[i].timestamp - this.versionHistory[i - 1].timestamp
      times.push(diff)
    }

    return times.reduce((a, b) => a + b, 0) / times.length
  }

  calculateStabilityScore() {
    if (this.versionHistory.length === 0) return 100

    const recentChanges = this.versionHistory.slice(-10) // Last 10 changes
    const majorChanges = recentChanges.filter((c) => c.changeType === "major").length
    const breakingChanges = recentChanges.filter((c) => c.breakingChanges.length > 0).length

    // Higher score = more stable (fewer major/breaking changes)
    const stabilityScore = 100 - majorChanges * 10 - breakingChanges * 5
    return Math.max(0, Math.min(100, stabilityScore))
  }

  assessRisk() {
    const recentMajorChanges = this.versionHistory.slice(-5).filter((c) => c.changeType === "major").length

    const pendingBreakingChanges = this.versionHistory.slice(-3).filter((c) => c.breakingChanges.length > 0).length

    let riskLevel = "low"
    let riskScore = 0

    if (recentMajorChanges >= 3) {
      riskLevel = "high"
      riskScore += 30
    } else if (recentMajorChanges >= 2) {
      riskLevel = "medium"
      riskScore += 15
    }

    if (pendingBreakingChanges >= 2) {
      riskLevel = "high"
      riskScore += 25
    }

    return {
      level: riskLevel,
      score: riskScore,
      factors: {
        recentMajorChanges,
        pendingBreakingChanges,
      },
    }
  }

  generateRecommendations() {
    const recommendations = []
    const analysis = {
      majorChanges: this.versionHistory.filter((c) => c.changeType === "major").length,
      recentChanges: this.versionHistory.slice(-5).length,
      stabilityScore: this.calculateStabilityScore(),
    }

    if (analysis.stabilityScore < 70) {
      recommendations.push({
        type: "stability",
        priority: "high",
        message: "Consider stabilizing the system before major updates",
        action: "Focus on patch releases and bug fixes",
      })
    }

    if (analysis.recentChanges > 8) {
      recommendations.push({
        type: "pace",
        priority: "medium",
        message: "High change frequency detected",
        action: "Consider batching smaller changes into minor releases",
      })
    }

    if (analysis.majorChanges > 5) {
      recommendations.push({
        type: "architecture",
        priority: "low",
        message: "Multiple major versions suggest architectural evolution",
        action: "Consider long-term architectural planning",
      })
    }

    return recommendations
  }

  // Dependency management
  checkDependencyImpacts(module, changeType, breakingChanges) {
    const dependents = this.dependencyTracker.getDependents(module)

    if (dependents.length > 0 && (changeType === "major" || breakingChanges.length > 0)) {
      console.log(`⚠️  Dependency impact detected for module: ${module}`)
      console.log(`   Affected modules: ${dependents.join(", ")}`)

      // Auto-suggest version bumps for dependents
      dependents.forEach((dependent) => {
        const suggestedChangeType = breakingChanges.length > 0 ? "major" : "minor"
        console.log(`   💡 Suggest ${suggestedChangeType} version bump for ${dependent}`)
      })
    }
  }

  // Rollback capabilities
  createRollbackPoint(module, version, change) {
    const rollbackPoint = {
      id: change.id,
      module,
      version,
      timestamp: new Date(),
      changeId: change.id,
      systemState: this.captureSystemState(),
    }

    this.rollbackPoints.push(rollbackPoint)
    console.log(`💾 Rollback point created: ${rollbackPoint.id}`)
  }

  rollback(rollbackId) {
    const rollbackPoint = this.rollbackPoints.find((rp) => rp.id === rollbackId)

    if (!rollbackPoint) {
      throw new Error(`Rollback point ${rollbackId} not found`)
    }

    console.log(`↩️  Rolling back to: ${rollbackPoint.id}`)

    // Restore version
    if (rollbackPoint.module === "core") {
      this.currentVersion = { ...rollbackPoint.version }
    } else {
      const moduleData = this.moduleVersions.get(rollbackPoint.module)
      if (moduleData) {
        moduleData.version = { ...rollbackPoint.version }
      }
    }

    // Record rollback in history
    const rollbackChange = {
      id: this.generateChangeId(),
      timestamp: new Date(),
      module: rollbackPoint.module,
      changeType: "rollback",
      from: this.getCurrentVersion(rollbackPoint.module),
      to: this.versionToString(rollbackPoint.version),
      description: `Rollback to ${rollbackPoint.id}`,
      breakingChanges: [],
      author: "Smart Fusion System",
      impact: "high",
    }

    this.versionHistory.push(rollbackChange)

    console.log(`✅ Rollback completed: ${rollbackPoint.module}`)
    return rollbackChange
  }

  // Utility methods
  generateChangeId() {
    return `change_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  versionToString(version) {
    return `${version.major}.${version.minor}.${version.patch}`
  }

  getCurrentVersion(module = "core") {
    if (module === "core") {
      return this.versionToString(this.currentVersion)
    }

    const moduleData = this.moduleVersions.get(module)
    return moduleData ? this.versionToString(moduleData.version) : null
  }

  calculateImpact(changeType, breakingChanges) {
    if (changeType === "major" || breakingChanges.length > 0) return "high"
    if (changeType === "minor") return "medium"
    return "low"
  }

  captureSystemState() {
    return {
      coreVersion: this.getCurrentVersion(),
      moduleVersions: Object.fromEntries(
        Array.from(this.moduleVersions.entries()).map(([name, data]) => [name, this.versionToString(data.version)]),
      ),
      timestamp: new Date(),
    }
  }

  getSystemStatus() {
    return {
      coreVersion: this.getCurrentVersion(),
      moduleVersions: Object.fromEntries(
        Array.from(this.moduleVersions.entries()).map(([name, data]) => [name, this.versionToString(data.version)]),
      ),
      totalChanges: this.versionHistory.length,
      lastChange: this.versionHistory[this.versionHistory.length - 1],
      stabilityScore: this.calculateStabilityScore(),
      rollbackPoints: this.rollbackPoints.length,
    }
  }

  // Generate comprehensive report
  generateVersionReport() {
    const analysis = this.analyzeVersionTrends()
    const status = this.getSystemStatus()

    console.log("\n" + "=".repeat(80))
    console.log("📋 COMPREHENSIVE VERSION REPORT")
    console.log("=".repeat(80))
    console.log(`Core Version: ${status.coreVersion}`)
    console.log(`Total Modules: ${Object.keys(status.moduleVersions).length}`)
    console.log(`Total Changes: ${status.totalChanges}`)
    console.log(`Stability Score: ${analysis.stabilityScore.toFixed(1)}%`)
    console.log(`Risk Level: ${analysis.riskAssessment.level}`)
    console.log(`Rollback Points: ${status.rollbackPoints}`)

    console.log("\n📊 MODULE VERSIONS:")
    Object.entries(status.moduleVersions).forEach(([module, version]) => {
      console.log(`   ${module}: v${version}`)
    })

    console.log("\n📈 CHANGE DISTRIBUTION:")
    Object.entries(analysis.changesByType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} changes`)
    })

    if (analysis.recommendations.length > 0) {
      console.log("\n💡 RECOMMENDATIONS:")
      analysis.recommendations.forEach((rec) => {
        console.log(`   [${rec.priority.toUpperCase()}] ${rec.message}`)
        console.log(`   Action: ${rec.action}`)
      })
    }

    console.log("=".repeat(80))

    return { analysis, status }
  }
}

class BranchingStrategy {
  constructor() {
    this.branches = new Map()
    this.activeBranch = "main"
  }

  createBranch(name, fromVersion) {
    this.branches.set(name, {
      name,
      baseVersion: fromVersion,
      created: new Date(),
      commits: [],
    })
    console.log(`🌿 Created branch: ${name} from ${fromVersion}`)
  }

  mergeBranch(branchName, targetBranch = "main") {
    const branch = this.branches.get(branchName)
    if (!branch) {
      throw new Error(`Branch ${branchName} not found`)
    }

    console.log(`🔀 Merging ${branchName} into ${targetBranch}`)
    // Merge logic would go here
    return true
  }
}

class DependencyTracker {
  constructor() {
    this.dependencies = new Map()
  }

  addDependency(module, dependsOn) {
    if (!this.dependencies.has(module)) {
      this.dependencies.set(module, new Set())
    }
    this.dependencies.get(module).add(dependsOn)
  }

  getDependents(module) {
    const dependents = []
    for (const [mod, deps] of this.dependencies.entries()) {
      if (deps.has(module)) {
        dependents.push(mod)
      }
    }
    return dependents
  }
}

// Demo the Enhanced Version Manager
async function demonstrateVersionManager() {
  console.log("🚀 ENHANCED VERSION MANAGER DEMONSTRATION")
  console.log("🎓 Business Education Platform Version Control")
  console.log("=".repeat(80))

  const versionManager = new EnhancedVersionManager()

  // Initialize with business education modules
  const modules = [
    { name: "financial-analysis", dependencies: ["core-math", "data-processing"] },
    { name: "strategic-thinking", dependencies: ["analytics-engine"] },
    { name: "leadership", dependencies: ["psychology-models"] },
    { name: "operations", dependencies: ["process-engine", "analytics-engine"] },
    { name: "marketing", dependencies: ["data-processing"] },
    { name: "entrepreneurship", dependencies: ["financial-analysis", "strategic-thinking"] },
  ]

  versionManager.initialize(modules)

  // Simulate version changes over time
  console.log("\n🔄 Simulating system evolution...")

  // Patch updates
  versionManager.bumpVersion("patch", "financial-analysis", "Fixed DCF calculation bug")
  await sleep(1000)

  versionManager.bumpVersion("patch", "strategic-thinking", "Updated Porter's Five Forces examples")
  await sleep(1000)

  // Minor updates
  versionManager.bumpVersion("minor", "leadership", "Added new situational leadership scenarios")
  await sleep(1000)

  versionManager.bumpVersion("minor", "operations", "Enhanced Lean Six Sigma tools")
  await sleep(1000)

  // Major update with breaking changes
  versionManager.bumpVersion("major", "financial-analysis", "Complete DCF engine rewrite with AI integration", [
    "API changes",
    "Data format changes",
  ])
  await sleep(1000)

  // Core system update
  versionManager.bumpVersion("minor", "core", "Enhanced personalization engine")

  // Generate comprehensive report
  versionManager.generateVersionReport()

  // Demonstrate rollback
  console.log("\n↩️  DEMONSTRATING ROLLBACK CAPABILITY")
  const lastChange = versionManager.versionHistory[versionManager.versionHistory.length - 1]
  versionManager.rollback(lastChange.id)

  console.log("\n✅ Version Manager demonstration completed!")
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Run the demonstration
demonstrateVersionManager().catch(console.error)
