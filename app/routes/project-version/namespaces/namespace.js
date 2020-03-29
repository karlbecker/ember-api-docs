import ClassRoute from '../classes/class';
import ScrollTracker from '../../../mixins/scroll-tracker';
import getFullVersion from '../../../utils/get-full-version';

export default ClassRoute.extend(ScrollTracker, {
  templateName: 'project-version/classes/class',

  async model(params, transition) {
    let projectID = transition.params['project-version'].project;
    let projectObj = await this.store.findRecord('project', projectID);
    let compactVersion = transition.params['project-version'].project_version;
    let projectVersion = getFullVersion(projectObj, compactVersion);
    const klass = params['namespace'];
    return this.find('namespace', `${projectID}-${projectVersion}-${klass}`);
  },

  serialize(model) {
    return {
      namespace: model.get('name')
    };
  }
});
