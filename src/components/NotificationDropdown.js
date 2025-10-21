import React, { useEffect, useRef, useContext } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { Bell, X } from "lucide-react";
import "../styles/notificationDropdown.css";
import { useLanguage } from "../context/LanguageContext";
import { AuthContext } from "../context/AuthContext";

export const NotificationDropdown = ({ isOpen, setOpenMenu, closeProfileMenu }) => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = React.useState([]);
    const [unreadCount, setUnreadCount] = React.useState(0);
    const [showFullPage, setShowFullPage] = React.useState(false);
    const dropdownRef = useRef(null);
    const { t, language } = useLanguage();

    // Merr njoftimet nga Firestore
    useEffect(() => {
        const notifsCollection = collection(db, "notifications");
        const q = query(notifsCollection, orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let notifs = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
            if (user && user.email) {
                notifs = notifs.filter((n) => n.userEmail === user.email.toLowerCase());
            } else if (!user) {
                notifs = notifs.filter((n) => !n.userEmail);
            }
            setNotifications(notifs);
            setUnreadCount(notifs.filter((n) => !n.read).length);
        });

        return () => unsubscribe();
    }, [user]);

    // Mark visible as read
    const markVisibleAsRead = async () => {
        if (!dropdownRef.current) return;
        const items = dropdownRef.current.querySelectorAll(".notification-item.unread");
        for (let item of items) {
            const rect = item.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                const notifId = item.dataset.id;
                const ref = doc(db, "notifications", notifId);
                await updateDoc(ref, { read: true });
            }
        }
    };

    // Open / Close
    const handleDropdownOpen = () => {
        closeProfileMenu?.(); // mbyll profilen nëse është e hapur
        if (window.innerWidth <= 1024) {
            setShowFullPage(true);
            return;
        }
        if (isOpen) {
            setOpenMenu(null);
        } else {
            setOpenMenu("notifications");
            setTimeout(markVisibleAsRead, 100);
        }
    };

    // Close full-page on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setShowFullPage(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (showFullPage) document.body.classList.add("notifications-open");
        else document.body.classList.remove("notifications-open");
    }, [showFullPage]);

    // Mark all read
    const handleMarkAllRead = async () => {
        const unread = notifications.filter((n) => !n.read);
        for (let notif of unread) {
            const ref = doc(db, "notifications", notif.id);
            await updateDoc(ref, { read: true });
        }
        setUnreadCount(0);
    };

    const renderNotificationItem = (notif) => (
        <div
            key={notif.id}
            data-id={notif.id}
            className={`notification-item ${notif.read ? "read" : "unread"}`}
        >
            <strong>{notif.title[language]}</strong>
            <p>{notif.body[language]}</p>
        </div>
    );

    return (
        <div className="notification-wrapper">
            <div className="bell-container" onClick={handleDropdownOpen}>
                <Bell className="bell-icon" />
                {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
            </div>

            {/* Desktop Dropdown */}
            {isOpen && (
                <div className="notification-dropdown" ref={dropdownRef}>
                    <div className="dropdown-notification">
                        <span className="notify">{t("Notifications")}</span>
                        {notifications.length > 0 && (
                            <button className="mark-read" onClick={handleMarkAllRead}></button>
                        )}
                    </div>
                    <div className="notification-items">
                        {notifications.length
                            ? notifications.map(renderNotificationItem)
                            : <p className="no-notifs">{t("noNotifications")}</p>}
                    </div>
                </div>
            )}

            {/* Mobile Full-Page */}
            {showFullPage && (
                <div className="fullpage-notifications">
                    <div className="mobile-header">
                        <h4 className="header-title">{t("Notifications")}</h4>
                        {notifications.length > 0 && (
                            <button className="mark-read-mobile" onClick={handleMarkAllRead}></button>
                        )}
                        <button className="back-btn" onClick={() => setShowFullPage(false)}>
                            <X size={24} strokeWidth={2} />
                        </button>
                    </div>
                    <div className="notification-items">
                        {notifications.length
                            ? notifications.map(renderNotificationItem)
                            : <p className="no-notifs">{t("noNotifications")}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};
