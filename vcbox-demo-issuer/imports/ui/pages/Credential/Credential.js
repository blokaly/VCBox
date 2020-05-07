import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { createCredDef, issueCred } from '../../../api/credential/methods';
import QRCode from 'qrcode'

// import components
import Alert from '../../components/Alert';

// import styles
import './Credential.scss';
import { withTracker } from 'meteor/react-meteor-data';
import Offer from '../../../api/credential/offer';
import CredRequest from '../../../api/credential/credreq';

const qrLogin = (canvas)=> {
  let container = document.getElementById('qrcode');
  container.innerHTML = '';
  container.appendChild(canvas);
}

class Credential extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schemaId: '',
      errMsg: null,
      reqId: null,
      reqObj: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleIssue = this.handleIssue.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      return this.props.history.push('/profile');
    }
  }

  shouldComponentUpdate(nextProps) {
    const {
      offerReady,
      offer,
    } = nextProps;
    if (offerReady) {
      QRCode.toCanvas(offer.url, function (error, canvas) {
        if (error) {console.error(error);}
        else {qrLogin(canvas);}
      })
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { schemaId } = this.state;
    createCredDef.call({ schemaId: schemaId })
  }

  handleClick(item) {
    this.setState({reqId:item._id, reqObj:item.request})
  }

  handleIssue() {
    const { reqId } = this.state;
    issueCred.call({reqId:reqId})
  }

  render() {
    const { errMsg } = this.state;

    return (
      <section className="login-page">
        <div className="card mx-auto" style={{ maxWidth: '28rem' }}>
          <div className="card-header">
            <div className="brand">
              <div  id="qrcode" className="text-center pt-3">
                <img
                  className="rounded-circle"
                  src="https://picsum.photos/150/150"
                  alt="logo"
                />
              </div>
            </div>
            <div className="card-body">
              <h4 className="card-title">Credential Definition Template</h4>
              <label className="card-title">Issuer DID: EbP4aYNeTHL6q385GuVpRV</label>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="schemaId">Schema ID:</label>

                  <input
                    id="schemaId"
                    type="text"
                    className="form-control"
                    name="schemaId"
                    value={this.state.schemaId}
                    onChange={e => this.setState({ schemaId: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group no-margin">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-2"
                  >Create
                  </button>
                  {errMsg && <Alert errMsg={errMsg} />}
                </div>
              </form>
            </div>
          </div>
          <div className="footer text-center">
            &copy; VCBox {new Date().getFullYear()}
          </div>
        </div>

        <div className="border-top my-3"></div>

        <div className="mx-auto" style={{ maxWidth: '28rem' }}>
          {this.props.credreq.length>0 && <h4 className="card-title">Applied Requests:</h4>}
          <ul className="list-group">
            {this.props.credreq.map((item, key) =>
              <button key={item._id} type="button" className="list-group-item list-group-item-action"
                      data-toggle="modal" data-target="#exampleModalLong"
              onClick={()=>{this.handleClick(item)}}>{item._id}</button>
            )}
          </ul>
        </div>

        <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Test Application: <strong><i>{this.state.reqId}</i></strong></h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{wordBreak: 'break-all', whiteSpace: 'normal' }}>
                {this.state.reqObj}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleIssue}>Issue</button>
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }
}

Credential.defaultProps = {
  // users: null, remote example (if using ddp)
  offer: null,
};

Credential.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // remote example (if using ddp)
  // usersReady: PropTypes.bool.isRequired,
  // users: Meteor.user() ? PropTypes.array.isRequired : () => null,
  offerReady: PropTypes.bool.isRequired,
  offer: PropTypes.shape({
    _id: PropTypes.string,
    url: PropTypes.string,
    offer: PropTypes.string,
  }),
  credreq: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    request: PropTypes.string,
  })),
};

export default withTracker(() => {
  // remote example (if using ddp)
  /*
  const usersSub = Remote.subscribe('users.friends'); // publication needs to be set on remote server
  const users = Users.find().fetch();
  const usersReady = usersSub.ready() && !!users;
  */

  // counters example
  let offerSub = Meteor.subscribe('offer');
  let offer = Offer.findOne();
  let offerReady = offerSub.ready() && !!offer;

  let credreqSub = Meteor.subscribe('cred.request');
  let credreq = CredRequest.find({}).fetch()
  return {
    // remote example (if using ddp)
    // usersReady,
    // users,
    offerReady,
    offer,
    credreq
  };
})(Credential);
