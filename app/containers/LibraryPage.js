import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Library from '../components/Library';

function mapStateToProps(state) {
  return {
    library: state.library
  };
}

export default connect(mapStateToProps)(Library);
