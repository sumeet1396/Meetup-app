import { MongoClient } from 'mongodb';

import MeetupList from '../Components/meetup/MeetupList';

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  //connect our mongo database
  const client = await MongoClient.connect(
    'mongodb+srv://sumeetrane:Monster1396@testcluster.prdqz.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
