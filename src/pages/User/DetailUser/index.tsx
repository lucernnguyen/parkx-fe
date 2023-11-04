import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { SystemGroupControllerGetInfoById } from '@/services/api/SystemGroupController';
import { SystemUserControllerGetDetailById } from '@/services/api/SystemUserController';
import { useParams } from '@umijs/max';
import { Card, Col, Image, Row, Tag, message } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import './index.less';

interface Props {}

export default (props: Props) => {
  const {} = props;
  const [user, setUser] = useState<API.UserDetails | undefined>();
  const [group, setGroup] = useState<API.GroupInfo | undefined>();
  const [isReload, setIsReload] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const { userId } = useParams();

  const getUserDetail = async () => {
    if (userId) {
      const res = await SystemUserControllerGetDetailById({ id: userId });
      if (res.success) {
        setUser(res.data);
        const groupRes = res.data?.groupId
          ? await SystemGroupControllerGetInfoById({ id: res.data?.groupId })
          : undefined;
        if (groupRes?.success) {
          setGroup(groupRes?.data);
        }
      }
    }
  };

  useEffect(() => {
    getUserDetail();
  }, [userId, isReload]);
  return (
    <>
      {contextHolder}
      <BreadcrumbCustom
        subNav={[
          {
            name: 'Home',
            path: '/dashboard',
          },
          {
            name: 'Manage Users ',
            path: '/manage-users',
          },
          {
            name: 'User Detail',
            path: '',
          },
        ]}
      />
      <Card
        className="cart-cus"
        title={<div className="title-card">User Detail</div>}
        style={{ width: '100%', borderRadius: 8, marginBottom: 12 }}
      >
        <Row gutter={24}>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Avatar: </p>
              <div className="custome-col">
                <Image
                  width={60}
                  height={60}
                  style={{ borderRadius: '50%' }}
                  src={user?.avatar ? user?.avatar : '/icons/Logo.png'}
                />
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Full name: </p>
              <div className="custome-col">
                <p className="text"> {user?.name || '--'}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Birthday: </p>
              <div className="custome-col">
                <p className="text">
                  {user?.dateOfBirth ? moment(user?.dateOfBirth).format('DD/MM/YYYY') : '--'}
                </p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Gender: </p>
              <div className="custome-col">
                <p className="text">{user?.gender || '--'}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Phone:</p>
              <div className="custome-col">
                <p className="text">{user?.phone || '--'}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Email:</p>
              <div className="custome-col">
                <p className="text">{user?.email || '--'}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Address:</p>
              <div className="custome-col">
                <p className="text">{user?.address}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Status:</p>
              <div className="custome-col">
                <Tag className="text-tag" color={!user?.active ? 'error' : 'success'}>
                  {!user?.active ? 'Đã khóa' : 'Hoạt động'}
                </Tag>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Id Card No:</p>
              <div className="custome-col">
                <p className="text">{user?.idCardNo}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Issue By:</p>
              <div className="custome-col">
                <p className="text">{user?.idCardIssuedBy}</p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Issue Date:</p>
              <div className="custome-col">
                <p className="text">
                  {user?.idCardIssuedDate
                    ? moment(user?.idCardIssuedDate).format('DD/MM/YYYY')
                    : '--'}
                </p>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-row-ekyc">
              <p className="text">Group Permission:</p>
              <div className="custome-col">
                <p className="text">{group?.name}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};
