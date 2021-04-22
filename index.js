import { createGitgraph, templateExtend, TemplateName } from "@gitgraph/js";

// Get the graph container HTML element.
const graphContainer = document.getElementById("graph-container");

// display options
const modifedMetro =  templateExtend(TemplateName.Metro, {
    orientation: "vertical-reverse",
    commit: {
        message: {
            displayAuthor: false,
            displayHash: true
        }
    }
});

// Instantiate the graph.
const gitgraph = createGitgraph(graphContainer, {template: modifedMetro});

//naming convention will be the following
//master branch only contains runnable code - each merge into this branch requires a tag to denote the version
//develop contains accepted working changes
//feature contains proposed enhancements

const master = gitgraph.branch("master");
master.commit("Q1 enhancements");
master.commit("Q1 release");
master.tag("v1.1");

const develop = master.branch("develop");
develop.commit("configuration for Q2 development");

const feature_target_redefinition = develop.branch("feature-target_redefinition");
feature_target_redefinition.commit("create project")
feature_target_redefinition.commit("completion of target development");

const feature_new_domain = develop.branch("feature-new_domain");
feature_new_domain.commit("create project")
feature_new_domain.commit("initial development");
feature_new_domain.commit("query optimization");

develop.merge(feature_target_redefinition, "target redefinition");

const feature_expanded_condition_definition = develop.branch("feature-expanded_condition_definition");
feature_expanded_condition_definition.commit("create project")
feature_expanded_condition_definition.commit("initial development");
feature_expanded_condition_definition.commit("bug fixes");

develop.merge(feature_expanded_condition_definition, "expanded chronic condition definition");
develop.merge(feature_new_domain, "additional feature domain");

master.merge(develop, "Q2 release");
master.tag("v1.2");