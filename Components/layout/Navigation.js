import Link from 'next/link';

import classes from './Layout.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <h1 className={classes.logo}><Link href='/'>Meetups</Link></h1>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
